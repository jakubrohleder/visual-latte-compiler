var Expression = require('./expression-prototype.js');
var exports = module.exports = ExpressionFuncall;

function ExpressionFuncall(opts) {
  var _this = this;

  Expression.call(_this, opts);

  _this.ident = opts.ident;
  _this.args = opts.args;

  // check if args are defined
}

ExpressionFuncall.prototype = Object.create(Expression.prototype);
ExpressionFuncall.prototype.constructor = ExpressionFuncall;
