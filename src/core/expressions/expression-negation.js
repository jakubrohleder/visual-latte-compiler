var Expression = require('./expression');

module.exports = {
  create: create
};

ExpressionNegation.prototype = Object.create(Expression.prototype);
ExpressionNegation.prototype.constructor = ExpressionNegation;
ExpressionNegation.prototype.semanticCheck = semanticCheck;

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
