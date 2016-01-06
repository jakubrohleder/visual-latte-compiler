var Type = require('./type');

var CodeBlock = require('latte/code/code-block');
var ExpressionObject = require('latte/core/expressions/expression-object');

var _ = require('lodash');

module.exports = TypeBoolean;

TypeBoolean.prototype = Object.create(Type.prototype);
TypeBoolean.prototype.constructor = TypeBoolean;
TypeBoolean.prototype.checkeValue = _.isBoolean;
TypeBoolean.prototype.defaultValueExpr = defaultValueExpr;

TypeBoolean.prototype.compile = compile;

function TypeBoolean(rootScope) {
  var _this = this;

  Type.call(_this);

  _this.builtin = true;
  _this.name = 'boolean';
  _this.rootScope = rootScope;
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
  // console.log(state);
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

function compile(state, value) {
  value = value ? 1 : 0;
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
    type: 'boolean',
    value: false,
    loc: loc
  });
}
