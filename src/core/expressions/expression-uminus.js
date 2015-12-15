var Expression = require('./expression-prototype.js');

module.exports = ExpressionUminus;

ExpressionUminus.prototype = Object.create(Expression.prototype);
ExpressionUminus.prototype.constructor = ExpressionUminus;
ExpressionUminus.prototype.semanticCheck = semanticCheck;

function ExpressionUminus(opts) {
  var _this = this;

  Expression.call(_this, opts);
}

function semanticCheck() {
  var _this = this;

  _this.expr.semanticCheck();

  _this.type = _this.expr.type;
}
