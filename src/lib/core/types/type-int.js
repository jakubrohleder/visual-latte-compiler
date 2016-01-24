var Type = require('./type');

var CodeBlock = require('latte/code/code-block');
var Value = require('latte/core/value');

var _ = require('lodash');

TypeInt.prototype = Object.create(Type.prototype);
TypeInt.prototype.constructor = TypeInt;
TypeInt.prototype.checkeValue = _.isNumber;
TypeInt.prototype.defaultValueExpr = defaultValueExpr;

var typeInt = module.exports = new TypeInt();

TypeInt.prototype.compile = compile;

function TypeInt() {
  var _this = this;

  Type.call(_this);

  _this.builtin = true;
  _this.name = 'int';
  _this.size = 8;

  _this.operators.binary = {
    '+': {
      compile: compileAdd.bind(_this)
    },
    '-': {
      compile: compileSub.bind(_this)
    },
    '/': {
      compile: compileDiv.bind(_this)
    },
    '*': {
      compile: compileMul.bind(_this)
    },
    '%': {
      compile: compileMod.bind(_this)
    },
    '>': {
      compile: compileGt.bind(_this)
    },
    '<': {
      compile: compileLt.bind(_this)
    },
    '>=': {
      compile: compileGeq.bind(_this)
    },
    '<=': {
      compile: compileLeq.bind(_this)
    },
    '==': {
      compile: compileEq.bind(_this)
    },
    '!=': {
      compile: compileNeq.bind(_this)
    }
  };

  _this.operators.unary = {
    '-': {
      compile: compileNeg.bind(_this)
    }
  };
}

function compile(state, expr) {
  var _this = this;
  var value = expr.text;

  expr.value = Value.create({
    type: _this,
    register: '%rax'
  });

  return 'movq $' + value + ', %rax';
}

function compileAdd(state, left, right) {
  return CodeBlock.create(this)
    .add('movq ' + left + ', %rax')
    .add('addq ' + right + ', %rax')
  ;
}

function compileSub(state, left, right) {
  return CodeBlock.create(this)
    .add('movq ' + left + ', %rax')
    .add('subq ' + right + ', %rax')
  ;
}

function compileDiv(state, left, right) {
  return CodeBlock.create(this)
    .add('cqto')
    .add('movq ' + left + ', %rax')
    .add('idivq ' + right)
  ;
}

function compileMul(state, left, right) {
  return CodeBlock.create(this)
    .add('movq ' + left + ', %rax')
    .add('imulq ' + right + ', %rax')
  ;
}

function compileMod(state, left, right) {
  return CodeBlock.create(this)
    .add('movq ' + left + ', %rax')
    .add('cqto')
    .add('idivq ' + right)
    .add('movq %rdx, %rax')
  ;
}

function compileNeg() {
  return CodeBlock.create(this)
    .add('negl %rax')
  ;
}

function compileGt() {
  return 'jg';
}

function compileLt() {
  return 'jl';
}

function compileGeq() {
  return 'jge';
}

function compileLeq() {
  return 'jle';
}

function compileEq() {
  return 'je';
}

function compileNeq() {
  return 'jne';
}

function defaultValueExpr(loc) {
  var ExpressionObject = require('latte/core/expressions/expression-object');

  return ExpressionObject.create({
    type: typeInt,
    text: 0,
    loc: loc
  });
}
