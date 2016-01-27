var parseError = require('latte/error').parseError;
var Element = require('../element');
var Null = require('latte/core/null');
var CodeBlock = require('latte/code/code-block');

var _ = require('lodash');

module.exports = {
  constr: Type,
  create: create
};

Type.prototype = Object.create(Element.prototype);
Type.prototype.constructor = Type;
Type.prototype.toString = toString;

Type.prototype.unaryOperationCheck = unaryOperationCheck;
Type.prototype.binaryOperationCheck = binaryOperationCheck;

Type.prototype.semanticCheckValue = semanticCheckValue;
Type.prototype.compileValue = compileValue;
Type.prototype.compileFree = compileFree;
Type.prototype.compileRef = compileRef;

Type.prototype.semanticCheck = semanticCheck;
Type.prototype.compile = compile;
Type.prototype.defaultValueExpr = defaultValueExpr;
Type.prototype.eq = eq;

Type.prototype.addProperty = addProperty;
Type.prototype.addFunction = addFunction;

function Type(opts) {
  var _this = this;

  _this.operators = {
    binary: {
      '==': {
        compile: compileEq.bind(_this)
      },
      '!=': {
        compile: compileNeq.bind(_this)
      }
    },
    unary: {}
  };

  _this.size = 8;
  _this.internalSize = 0;
  _this.pointer = true;
  _this.builtin = false;

  _this.properties = {};

  _this.functions = {};

  _this.loc = {
    first_line: 1,
    last_line: 1,
    first_column: 1,
    last_column: 1
  };

  Element.call(_this, opts);
}

function create(opts) {
  return new Type(opts);
}

function compileEq() {
  return 'je';
}

function compileNeq() {
  return 'jne';
}

function eq(argument, symetrical) {
  var _this = this;
  var isExt = false;
  var isNull = argument === Null;
  var ext = argument.extends;

  while (isExt === false && ext !== undefined) {
    isExt = ext === _this;
    ext = ext.extends;
  }

  if (symetrical) {
    isNull = isNull || _this === Null;
    ext = _this.extends;

    while (isExt === false && ext !== undefined) {
      isExt = ext === argument;
      ext = ext.extends;
    }
  }

  return argument === _this || isNull || isExt;
}

function addProperty(property, name) {
  var _this = this;

  if (_this.properties[name] === undefined) {
    if (property.addressShift === undefined) {
      property.addressShift = _this.internalSize;
    }

    property.property = true;
    property.address = property.addressShift + '(%rbx)';
    _this.properties[name] = property;
    _this.internalSize += property.type.size;
  }

  return property.addressShift;
}

function addFunction(fun, name) {
  var _this = this;
  var oldFun;

  if (_this.functions[name] === undefined) {
    if (fun.addressShift === undefined) {
      fun.addressShift = _this.internalSize;
    }

    _this.functions[name] = fun;
    _this.internalSize += 8;
  } else {
    oldFun = _this.functions[name];

    if (!oldFun.type.eq(fun.type)) {
      parseError(
        'Wrong type for function ' + name + ' ovveride: ' + fun.type + ' instead of ' + oldFun.type,
        _this.loc,
        _this
      );
    }

    fun.addressShift = oldFun.addressShift;
    _this.functions[name] = fun;
  }

  return fun.addressShift;
}

function semanticCheck(state) {
  var _this = this;
  var TypeInt = require('latte/core/types/type-int');
  var ext;

  if (_this.scope !== undefined) {
    return;
  }

  if (_this.extends !== undefined) {
    ext = state.scope.getType(_this.extends);

    if (ext === undefined) {
      parseError(
        'Undefined class for extends: ' + _this + ' extends ' + _this.extends,
        _this.loc,
        _this
      );
    }

    _this.extends = ext;

    if (_this.extends.scope === undefined) {
      _this.extends.semanticCheck(state);
    }
  }

  _this.scope = state.pushScope();

  if (_this.extends !== undefined) {
    _this.scope.parent = _this.extends.scope;
  }

  state.pushType(_this);
  _this.block.semanticCheck(state, true);

  if (_this.extends === undefined) {
    _this.addProperty({
      type: TypeInt,
      name: 'references'
    }, 'references');

    _this.addProperty({
      type: TypeInt,
      name: 'length'
    }, 'length');
  } else {
    _.forEach(_this.extends.properties, _this.addProperty.bind(_this));
    _.forEach(_this.extends.functions, _this.addFunction.bind(_this));
    _this.internalSize = _this.extends.internalSize;
  }

  _.forEach(_this.scope.variables, _this.addProperty.bind(_this));
  _.forEach(_this.scope.functions, _this.addFunction.bind(_this));

  state.popType();
  state.popScope();
}

function compile(state) {
  var _this = this;

  return _this.scope.compile(state);
}

function semanticCheckValue() {
  //
}

function compileValue(state) {
  var _this = this;
  var malloc = 'malloc';
  var rbx = state.pushRegister();
  var code;
  var ext;

  if (state.os === 'darwin') {
    malloc = '_' + malloc;
  }

  code = CodeBlock.create(undefined, 'Allocating ' + _this.name)
    .add('movq %rbx, ' + rbx)
    .add('movq $' + _this.internalSize + ', %rdi')
    .add('call ' + malloc)

    .add('movq %rax, %rbx')
    .add('movq $0, (%rbx)')
    .add('movq $' + _this.internalSize + ', 8(%rbx)')
  ;

  ext = _this.extends;

  while (ext !== undefined) {
    code.add(ext.block.compile(state));
    ext = ext.extends;
  }

  code.add(_this.block.compile(state));

  _.forEach(_this.functions, function(fun) {
    code
      .add('leaq ' + fun.ident + '(%rip), %rdx')
      .add('movq %rdx, ' + fun.addressShift + '(%rbx)');
  });

  code.add('movq %rbx, %rax');
  code.add('movq ' + rbx + ', %rbx');

  return code;
}

function defaultValueExpr() {
  return Null;
}

function unaryOperationCheck(operator) {
  var _this = this;

  if (_this.operators.unary[operator] === undefined) {
    parseError(
      'Unary operator ' + operator + ' not defined for type ' + _this.name,
      _this.loc,
      _this
    );
  }
}

function binaryOperationCheck(operator, rightType) {
  var _this = this;

  if (_this.operators.unary[operator] === undefined) {
    parseError(
      'Binary operator ' + operator + ' not defined for type ' + _this.name,
      _this.loc,
      _this
    );
  } else if (_this.operators.unary[operator][rightType.name] === undefined) {
    parseError(
      'Binary operator ' + operator + ' not defined for type ' + _this.name + ' and ' + rightType.name,
      _this.loc,
      _this
    );
  }
}

function toString() {
  return this.name;
}

function compileFree(state, address, decq, skip) {
  // var _this = this;
  // var end = state.nextLabel();
  // var free = 'free';
  // var puts = 'puts';
  // var printf = 'printf';
  // var typeRef = state.pushRegister();
  // var elementsBlock;

  // if (state.os === 'darwin') {
  //   free = '_' + free;
  //   printf = '_' + printf;
  //   puts = '_' + puts;
  // }

  // elementsBlock = CodeBlock.create(undefined, 'freeing elements');

  // // _.forEach(_this.properties, function(property) {
  // //   elementsBlock
  // //     .add('movq ' + typeRef + ', %rax')
  // //     .add('movq ' + property.addressShift + '(%rax), %rax')
  // //     .add(property.type.compileFree(state, '%rax', true))
  // //   ;
  // // });

  // return CodeBlock.create(undefined, 'compileFree type')
  //   .add('movq ' + address + ', %rax')
  //   .add('movq %rax, ' + typeRef)
  //   .add('cmpq $0, ' + typeRef)
  //   .add('je ' + end)
  //   .add('movq ' + typeRef + ', %rax')
  //   .if(decq, 'decq (%rax)')
  //   .if(skip, 'jmp ' + end)

  //   .add('cmpq $0, (%rax)')
  //   .add('jne ' + end)

  //   // .add('leaq FREE_TYPE_STRING(%rip), %rdi')
  //   // .add('call ' + puts)

  //   // .add(elementsBlock)

  //   .add('movq ' + typeRef + ', %rdi')
  //   .add('callq ' + free)

  //   .add(end + ':')
  //   .add('movq ' + typeRef + ', %rax')
  //   .add('movq %rax, ' + address)

  //   .exec(state.popRegister())
  // ;
}

function compileRef(state, address) {
  var end = state.nextLabel();
  var elementRef = state.pushRegister();

  return CodeBlock.create(undefined, 'Adding ref')
    .add('movq ' + address + ', %rax')
    .add('movq %rax, ' + elementRef)

    .add('cmpq $0, %rax')
    .add('je ' + end)
    .add('movq ' + elementRef + ', %rax')
    .add('incq (%rax)')

    .add(end + ':')
    .add('movq ' + elementRef + ', %rax')
    .add('movq %rax, ' + address)
    .exec(state.popRegister())
  ;
}
