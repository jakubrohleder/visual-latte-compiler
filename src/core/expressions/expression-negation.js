var Expression = require('./expression-prototype.js');

module.exports = ExpressionNegation;

ExpressionNegation.prototype = Object.create(Expression.prototype);
ExpressionNegation.prototype.constructor = ExpressionNegation;
ExpressionNegation.prototype.semanticCheck = semanticCheck;

function ExpressionNegation(opts) {
  var _this = this;

  Expression.call(_this, opts);
}

function semanticCheck() {
  var _this = this;

  _this.expr.semanticCheck();

  _this.type = _this.expr.type;
}
