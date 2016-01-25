var Type = require('./type').constr;

var CodeBlock = require('latte/code/code-block');
var ExpressionObject = require('latte/core/expressions/expression-object');

TypeBoolean.prototype = Object.create(Type.prototype);
TypeBoolean.prototype.constructor = TypeBoolean;
TypeBoolean.prototype.defaultValueExpr = defaultValueExpr;
TypeBoolean.prototype.compileValue = compileValue;
TypeBoolean.prototype.compile = compile;
TypeBoolean.prototype.semanticCheck = semanticCheck;
TypeBoolean.prototype.eq = eq;

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

function eq(argument) {
  return argument === this;
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

function compileValue(state, expr) {
  var value = expr.text ? 1 : 0;

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

function semanticCheck() {
  // empty
}

function compile() {
  // empty
}
