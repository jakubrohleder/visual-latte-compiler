var Expression = require('./expression-prototype.js');

module.exports = ExpressionUminus;

ExpressionUminus.prototype = Object.create(Expression.prototype);
ExpressionUminus.prototype.constructor = ExpressionUminus;
ExpressionUminus.prototype.staticCheck = staticCheck;

function ExpressionUminus(opts) {
  var _this = this;

  Expression.call(_this, opts);
}

function staticCheck() {
  var _this = this;

  _this.expr.staticCheck();

  _this.type = _this.expr.type;
}
