var Expression = require('./expression');
var parseError = require('../error').parseError;

module.exports = {
  create: create
};

ExpressionComparison.prototype = Object.create(Expression.prototype);
ExpressionComparison.prototype.constructor = ExpressionComparison;
ExpressionComparison.prototype.semanticCheck = semanticCheck;

function ExpressionComparison(opts) {
  var _this = this;

  Expression.call(_this, opts);
}

function semanticCheck(state) {
  var _this = this;
  var bool = state.scope.getType('boolean');

  _this.left.semanticCheck(state);
  _this.right.semanticCheck(state);

  if (_this.left.type !== _this.right.type) {
    parseError(
      'Can\'t compare diferent type variables: ' + _this.left.type + ' and ' + _this.right.type,
      _this.loc,
      _this
    );
  }

  _this.type = bool;
}

function create(opts) {
  return new ExpressionComparison(opts);
}
