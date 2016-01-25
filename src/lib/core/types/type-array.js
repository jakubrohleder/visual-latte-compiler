var Type = require('./type').constr;

var CodeBlock = require('latte/code/code-block');
var TypeInt = require('latte/core/types/type-int');

var arrayType = {};

module.exports = {
  create: create
};

TypeArray.prototype = Object.create(Type.prototype);
TypeArray.prototype.constructor = TypeArray;
TypeArray.prototype.defaultValueExpr = defaultValueExpr;
TypeArray.prototype.toString = toString;

TypeArray.prototype.semanticCheck = semanticCheck;
TypeArray.prototype.compile = compile;
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

  return 'array:' + _this.elementType;
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
