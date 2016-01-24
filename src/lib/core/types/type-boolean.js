var Type = require('./type');

var CodeBlock = require('latte/code/code-block');
var ExpressionObject = require('latte/core/expressions/expression-object');
var Value = require('latte/core/value');

var _ = require('lodash');

TypeBoolean.prototype = Object.create(Type.prototype);
TypeBoolean.prototype.constructor = TypeBoolean;
TypeBoolean.prototype.checkeValue = _.isBoolean;
TypeBoolean.prototype.defaultValueExpr = defaultValueExpr;
TypeBoolean.prototype.compile = compile;

var typeBoolean = module.exports = new TypeBoolean();

function TypeBoolean() {
  var _this = this;

  Type.call(_this);

  _this.builtin = true;
  _this.name = 'boolean';
  _this.size = 4;

  _this.operators.binary = {
    '||': {
      compile: compileOr.bind(_this)
    },
    '&&': {
      compile: compileAnd.bind(_this)
    },
    '==': {
      compile: compileEq.bind(_this)
    },
    '!=': {
      compile: compileNeq.bind(_this)
    }
  };

  _this.operators.unary = {
    '!': {
      compile: compileNeg.bind(_this)
    }
  };
}

function compileOr(state, label) {
  return CodeBlock.create(this)
    .add('cmpq $1, %rax')
    .add('je ' + label)
  ;
}

function compileAnd(state, label) {
  return CodeBlock.create(this)
    .add('cmpq $0, %rax')
    .add('je ' + label)
  ;
}

function compileNeg() {
  return CodeBlock.create(this)
    .add('notq %rax');
}

function compile(state, expr) {
  var _this = this;
  var value = expr.text ? 1 : 0;

  expr.value = Value.create({
    type: _this,
    register: '%rax'
  });

  return 'movq $' + value + ', %rax';
}

function compileEq() {
  return 'je';
}

function compileNeq() {
  return 'jne';
}

function defaultValueExpr(loc) {
  return ExpressionObject.create({
    type: typeBoolean,
    text: false,
    loc: loc
  });
}
