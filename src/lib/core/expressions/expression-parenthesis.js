var CodeBlock = require('latte/code/code-block');

var Expression = require('./expression');

module.exports = {
  create: create
};

ExpressionParenthesis.prototype = Object.create(Expression.prototype);
ExpressionParenthesis.prototype.constructor = ExpressionParenthesis;
ExpressionParenthesis.prototype.semanticCheck = semanticCheck;
ExpressionParenthesis.prototype.compile = compile;
ExpressionParenthesis.prototype.toString = toString;

function ExpressionParenthesis(opts) {
  var _this = this;

  Expression.call(_this, opts);
}

function create(opts) {
  return new ExpressionParenthesis(opts);
}

function semanticCheck(state) {
  var _this = this;

  _this.expr.semanticCheck(state);

  _this.type = _this.expr.type;
}

function compile(state) {
  var _this = this;
  var code = CodeBlock.create(_this)
    .add(_this.expr.compile(state))
  ;

  return code;
}

function toString() {
  var _this = this;

  return '(' + _this.expr + ')';
}
