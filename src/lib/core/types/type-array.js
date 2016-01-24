var Type = require('./type');

var CodeBlock = require('latte/code/code-block');
var TypeInt = require('latte/core/types/type-int');
var Value = require('latte/core/value');

var _ = require('lodash');

var arrayType = {};

module.exports = {
  create: create
};

TypeArray.prototype = Object.create(Type.prototype);
TypeArray.prototype.constructor = TypeArray;
TypeArray.prototype.checkeValue = _.isNumber;
TypeArray.prototype.defaultValueExpr = defaultValueExpr;
TypeArray.prototype.toString = toString;

TypeArray.prototype.compile = compile;

function TypeArray(elementType) {
  var _this = this;

  Type.call(_this);

  _this.builtin = true;
  _this.name = 'array';
  _this.size = 8;
  _this.pointer = true;
  _this.elementType = elementType;

  _this.properties = {
    length: {
      type: TypeInt,
      index: 0
    }
  };
}

function create(elementType) {
  if (arrayType[elementType] === undefined) {
    arrayType[elementType] = new TypeArray(elementType);
  }

  return arrayType[elementType];
}

function compile(state, expr) {
  var _this = this;
  var malloc = 'malloc';
  var lengthPointer = state.pushRegister();

  state.popRegister();

  expr.value = Value.create({
    type: _this,
    register: '%rax'
  });

  if (state.os === 'darwin') {
    malloc = '_' + malloc;
  }

  return CodeBlock.create(undefined, 'Allocating array')
    .add(expr.expr.compile(state))
    .add('movq %rax, ' + lengthPointer)
    .add('imulq $' + _this.elementType.size + ', %rax')
    .add('addq $8, %rax')
    .add('movq %rax, %rdi')
    .add('call ' + malloc)
    .add('movq ' + lengthPointer + ', (%rax)')
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
