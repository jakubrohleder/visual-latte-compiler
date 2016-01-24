var CodeBlock = require('latte/code/code-block');
var parseError = require('latte/error').parseError;
var Value = require('latte/core/value');
var TypeBoolean = require('latte/core/types/type-boolean');

var Expression = require('./expression');

module.exports = {
  create: create
};

ExpressionNegation.prototype = Object.create(Expression.prototype);
ExpressionNegation.prototype.constructor = ExpressionNegation;
ExpressionNegation.prototype.semanticCheck = semanticCheck;
ExpressionNegation.prototype.compile = compile;
ExpressionNegation.prototype.toString = toString;

function ExpressionNegation(opts) {
  var _this = this;

  Expression.call(_this, opts);
}

function semanticCheck(state) {
  var _this = this;

  _this.expr.semanticCheck(state);

  if (_this.expr.type !== TypeBoolean) {
    parseError(
      'Wrong type for boolean negation \'' + _this.expr.type + '\' instead of \'boolean\'',
      _this.loc,
      _this
    );
  }

  _this.type = _this.expr.type;
}

function create(opts) {
  return new ExpressionNegation(opts);
}

function compile(state) {
  var _this = this;
  _this.value = Value.create({
    type: _this.type,
    expr: _this,
    register: '%rax'
  });

  return CodeBlock.create(_this)
    .add(_this.expr.compile(state))
    .add('xorq  $1, %rax')
  ;
}

function toString() {
  var _this = this;

  return '!' + _this.expr;
}
