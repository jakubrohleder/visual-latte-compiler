var CodeBlock = require('latte/code/code-block');

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

  _this.type = _this.expr.type;
}

function create(opts) {
  return new ExpressionNegation(opts);
}

function compile() {
  var _this = this;

  return CodeBlock.create(_this)
    .add('negl %eax')
  ;
}

function toString() {
  var _this = this;

  return '!' + _this.expr;
}
