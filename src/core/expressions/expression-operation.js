var Expression = require('./expression-prototype.js');
var exports = module.exports = ExpressionOperation;

function ExpressionOperation(opts) {
  var _this = this;

  Expression.call(_this, opts);

  _this.left = opts.left;
  _this.right = opts.right;
  _this.operator = opts.operator;

  if (_this.left.type !== _this.right.type) {
    console.error(
      'Can\'t process two vars with different type',
      _this.left.type,
      _this.right.type
    )
  }

  _this.type = _this.left.type;
}

ExpressionOperation.prototype = Object.create(Expression.prototype);
ExpressionOperation.prototype.constructor = ExpressionOperation;
