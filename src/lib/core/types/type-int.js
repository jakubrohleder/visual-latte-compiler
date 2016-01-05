var Type = require('./type');

var CodeBlock = require('latte/code/code-block');

var _ = require('lodash');

module.exports = TypeInt;

TypeInt.prototype = Object.create(Type.prototype);
TypeInt.prototype.constructor = TypeInt;
TypeInt.prototype.checkeValue = _.isNumber;

TypeInt.prototype.compile = compile;

function TypeInt(rootScope) {
  var _this = this;

  Type.call(_this);

  _this.builtin = true;
  _this.name = 'int';
  _this.rootScope = rootScope;
  _this.size = 4;

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
      compile: compileLt.bind(_this)
    },
    '<': {
      compile: compileGt.bind(_this)
    },
    '>=': {
      compile: compileLeq.bind(_this)
    },
    '<=': {
      compile: compileGeq.bind(_this)
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

function compileAdd() {
  return CodeBlock.create(this)
    .add('addq %rdx, %rax')
  ;
}

function compileSub() {
  return CodeBlock.create(this)
    .add('subq %rdx, %rax')
  ;
}

function compileDiv() {
  return CodeBlock.create(this)
    .add('idivq %rdx')
  ;
}

function compileMul() {
  return CodeBlock.create(this)
    .add('imulq %rdx, %rax')
  ;
}

function compileMod() {
  return CodeBlock.create(this)
    .add('idivq %rdx')
    .add('movq %rdx, %rax')
  ;
}

function compileNeg() {
  return CodeBlock.create(this)
    .add('negl %rax')
  ;
}

function compile(value) {
  return '$' + value;
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

