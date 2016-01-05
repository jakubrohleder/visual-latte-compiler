var Type = require('./type');

var CodeBlock = require('latte/code/code-block');

var _ = require('lodash');

module.exports = TypeBoolean;

TypeBoolean.prototype = Object.create(Type.prototype);
TypeBoolean.prototype.constructor = TypeBoolean;
TypeBoolean.prototype.checkeValue = _.isBoolean;

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

function compileOr() {
  return CodeBlock.create(this)
    .add('orq %rdx, %rax');
}

function compileAnd() {
  return CodeBlock.create(this)
    .add('andq %rdx, %rax');
}

function compileNeg() {
  return CodeBlock.create(this)
    .add('notq %rax');
}

function compile(value) {
  return '$' + value ? 1 : 0;
}

function compileEq() {
  return 'je';
}

function compileNeq() {
  return 'jne';
}
