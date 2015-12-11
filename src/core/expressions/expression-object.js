var Expression = require('./expression-prototype.js');
var exports = module.exports = ExpressionObject;

function ExpressionObject(opts) {
  var _this = this;

  Expression.call(_this, opts);

  _this.value = opts.value;
  _this.type = opts.type;
}

ExpressionObject.prototype = Object.create(Expression.prototype);
ExpressionObject.prototype.constructor = ExpressionObject;
