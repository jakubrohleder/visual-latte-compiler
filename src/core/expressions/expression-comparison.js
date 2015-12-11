var Expression = require('./expression-prototype.js');
var exports = module.exports = ExpressionComparison;

function ExpressionComparison(opts) {
  var _this = this;

  Expression.call(_this, opts);

  _this.left = opts.left;
  _this.right = opts.right;
  _this.operator = opts.operator;

  if (_this.left.type !== _this.right.type) {
    console.error(
      'Can\'t compare two vars with diferent type',
      _this.left.type,
      _this.right.type
    )
  }
}

ExpressionComparison.prototype = Object.create(Expression.prototype);
ExpressionComparison.prototype.constructor = ExpressionComparison;
