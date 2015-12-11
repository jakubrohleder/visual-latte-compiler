var Expression = require('./expression-prototype.js');
var exports = module.exports = ExpressionUminus;

function ExpressionUminus(opts) {
  var _this = this;

  Expression.call(_this, opts);

  _this.value = opts.value;

  if (_this.value.type !== 'boolean') {
    console.error(
      'Can\'t uminus var that is no an integer',
      _this.value
    )
  }
}

ExpressionUminus.prototype = Object.create(Expression.prototype);
ExpressionUminus.prototype.constructor = ExpressionUminus;
