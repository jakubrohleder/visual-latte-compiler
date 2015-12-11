var Expression = require('./expression-prototype.js');

module.exports = ExpressionObject;

ExpressionObject.prototype = Object.create(Expression.prototype);
ExpressionObject.prototype.constructor = ExpressionObject;

function ExpressionObject(opts) {
  var _this = this;

  Expression.call(_this, opts);
}
