var Expression = require('./expression');
var parseError = require('../error').parseError;

module.exports = {
  create: create
};

ExpressionUminus.prototype = Object.create(Expression.prototype);
ExpressionUminus.prototype.constructor = ExpressionUminus;
ExpressionUminus.prototype.semanticCheck = semanticCheck;

function ExpressionUminus(opts) {
  var _this = this;

  Expression.call(_this, opts);
}

function semanticCheck(state) {
  var _this = this;
  var integer = state.scope.getType('int');

  _this.expr.semanticCheck(state);

  if (_this.expr.type !== integer) {
    parseError(
      'Wrong type for integer negation \'' + _this.expr.type + '\' instead of \'int\'',
      _this.loc,
      _this
    );
  }

  _this.type = _this.expr.type;
}

function create(opts) {
  return new ExpressionUminus(opts);
}
