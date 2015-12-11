var Expression = require('./expression-prototype.js');
var exports = module.exports = ExpressionNegation;

function ExpressionNegation(opts) {
  var _this = this;

  Expression.call(_this, opts);

  _this.value = opts.value;

  if (_this.value.type !== 'boolean') {
    console.error(
      'Can\'t negate var that is not a boolean',
      _this.value
    )
  }
}

ExpressionNegation.prototype = Object.create(Expression.prototype);
ExpressionNegation.prototype.constructor = ExpressionNegation;
