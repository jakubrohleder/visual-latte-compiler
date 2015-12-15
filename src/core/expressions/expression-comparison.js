var Expression = require('./expression-prototype.js');
var parseError = require('../error').parseError;

module.exports = ExpressionComparison;

ExpressionComparison.prototype = Object.create(Expression.prototype);
ExpressionComparison.prototype.constructor = ExpressionComparison;
ExpressionComparison.prototype.staticCheck = staticCheck;

function ExpressionComparison(opts) {
  var _this = this;

  Expression.call(_this, opts);
}

function staticCheck() {
  var _this = this;

  _this.left.staticCheck();
  _this.right.staticCheck();

  if (_this.left.type !== _this.right.type) {
    parseError('Can\'t process diferent type: ' + _this.left.type + ' and ' + _this.right.type, _this);
  }

  _this.type = 'boolean';
}
