var Expression = require('./expression-prototype.js');

module.exports = ExpressionNegation;

ExpressionNegation.prototype = Object.create(Expression.prototype);
ExpressionNegation.prototype.constructor = ExpressionNegation;
ExpressionNegation.prototype.staticCheck = staticCheck;

function ExpressionNegation(opts) {
  var _this = this;

  Expression.call(_this, opts);
}

function staticCheck() {
  var _this = this;

  _this.expr.staticCheck();

  _this.type = _this.expr.type;
}
