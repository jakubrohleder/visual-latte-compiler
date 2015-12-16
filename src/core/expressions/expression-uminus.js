var Expression = require('./expression-prototype.js');
var parseError = require('../error').parseError;

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

  if (_this.expr.type !== 'int') {
    parseError(
      'Wrong type for integer negation \'' + _this.expr.type + '\' instead of \'int\'',
      _this.loc,
      _this
    );
  }

  _this.type = _this.expr.type;
}
