var Expression = require('./expression-prototype.js');
var exports = module.exports = ExpressionLogical;

function ExpressionLogical(opts) {
  var _this = this;

  Expression.call(_this, opts);

  _this.left = opts.left;
  _this.right = opts.right;
  _this.operator = opts.operator;
}

ExpressionLogical.prototype = Object.create(Expression.prototype);
ExpressionLogical.prototype.constructor = ExpressionLogical;
