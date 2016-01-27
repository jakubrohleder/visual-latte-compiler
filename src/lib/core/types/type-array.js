var Type = require('./type').constr;

var CodeBlock = require('latte/code/code-block');
var TypeInt = require('latte/core/types/type-int');

var arrayType = {};

module.exports = {
  create: create,
  reset: reset
};

TypeArray.prototype = Object.create(Type.prototype);
TypeArray.prototype.constructor = TypeArray;
TypeArray.prototype.defaultValueExpr = defaultValueExpr;
TypeArray.prototype.toString = toString;
TypeArray.prototype.semanticCheck = semanticCheck;
TypeArray.prototype.compile = compile;
TypeArray.prototype.compileFree = compileFree;
TypeArray.prototype.semanticCheckValue = semanticCheckValue;
TypeArray.prototype.compileValue = compileValue;


function TypeArray(elementType) {
  var _this = this;

  Type.call(_this);

  _this.builtin = true;
  _this.name = 'array';
  _this.size = 8;
  _this.pointer = true;

  _this.elementType = elementType;

  _this.addProperty({
    type: TypeInt,
    name: 'references'
  }, 'references');

  _this.addProperty({
    type: TypeInt,
    name: 'length'
  }, 'length');
}

function reset() {
  arrayType = {};
}

function create(elementType) {
  if (arrayType[elementType] === undefined) {
    arrayType[elementType] = new TypeArray(elementType);
  }

  return arrayType[elementType];
}

function compileValue(state, expr) {
  var _this = this;
  var malloc = 'malloc';
  var memset = 'memset';
  var lengthPointer = state.pushRegister();
  var resultPointer = state.pushRegister();

  state.popRegister();
  state.popRegister();

  if (state.os === 'darwin') {
    malloc = '_' + malloc;
    memset = '_' + memset;
  }

  return CodeBlock.create(undefined, 'Allocating array')
    .add(expr.expr.compile(state))
    .add('movq %rax, ' + lengthPointer)
    .add('imulq $' + _this.elementType.size + ', %rax')
    .add('addq $16, %rax')
    .add('movq %rax, %rdi')
    .add('call ' + malloc)
    .add('movq %rax, ' + resultPointer)

    .add('movq %rax, %rdi')
    .add('movq $0, %rsi')
    .add('movq ' + lengthPointer + ', %rax')
    .add('imulq $' + _this.elementType.size + ', %rax')
    .add('addq $16, %rax')
    .add('movq %rax, %rdx')
    .add('call ' + memset)

    .add('movq ' + resultPointer + ', %rax')
    .add('movq ' + lengthPointer + ', %rdx')
    .add('movq %rdx, 8(%rax)')
  ;
}

function defaultValueExpr(loc, type) {
  var ExpressionObject = require('latte/core/expressions/expression-object');

  return ExpressionObject.create({
    type: new TypeArray(type),
    array: true,
    expr: ExpressionObject.create({
      type: TypeInt,
      text: 0
    }),
    loc: loc
  });
}

function toString() {
  var _this = this;

  return 'array_' + _this.elementType;
}

function compile() {
  //
}

function semanticCheck() {
//
}

function semanticCheckValue() {
  //
}

function compileFree(state, address, decq, skip) {
  var _this = this;
  var end = state.nextLabel();
  var loopStart = state.nextLabel();
  var loopEnd = state.nextLabel();
  var free = 'free';
  var puts = 'puts';
  var printf = 'printf';
  var arrayRef = state.pushRegister();
  var elemRef = state.pushRegister();

  if (state.os === 'darwin') {
    free = '_' + free;
    printf = '_' + printf;
    puts = '_' + puts;
  }

  return CodeBlock.create(undefined, 'compileFree array')
    .add('movq ' + address + ', %rax')
    .add('movq %rax, ' + arrayRef)
    .add('cmpq $0, ' + arrayRef)
    .add('je ' + end)
    .add('movq ' + arrayRef + ', %rax')
    .if(decq, 'decq (%rax)')
    .if(skip, 'jmp ' + end)

    .add('cmpq $0, (%rax)')
    .add('jne ' + end)

    // .add('leaq FREE_ARRAY_STRING(%rip), %rdi')
    // .add('call ' + puts)

    .add(CodeBlock.create(undefined, 'freeing elements')
      .add('movq $0, ' + elemRef)
      .add(loopStart + ':', 'loopStart label', -1)
      .add(CodeBlock.create(undefined, 'For condition')
        .add('movq ' + arrayRef + ', %rax')
        .add('movq ' + elemRef + ', %rdx')
        .add('cmpq %rdx, 8(%rax)')
        .add('jle ' + loopEnd)
      )
      .add('movq ' + arrayRef + ', %rax')
      .add('movq ' + elemRef + ', %rdx')
      .add('movq 16(%rax, %rdx, ' + _this.elementType.size + '), %rax')
      .add(_this.elementType.compileFree(state, '%rax', true))
      .add('incq ' + elemRef)
      .add('jmp ' + loopStart)
      .add(loopEnd + ':', 'loopEnd label', -1)
    )

    .add('movq ' + arrayRef + ', %rdi')
    .add('callq ' + free)

    .add(end + ':')
    .add('movq ' + arrayRef + ', %rax')
    .add('movq %rax, ' + address)

    .exec(state.popRegister())
    .exec(state.popRegister())
  ;
}
