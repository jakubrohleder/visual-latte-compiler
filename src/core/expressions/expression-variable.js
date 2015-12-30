var Expression = require('./expression');
var parseError = require('../error').parseError;

module.exports = {
  create: create
};

ExpressionVariable.prototype = Object.create(Expression.prototype);
ExpressionVariable.prototype.constructor = ExpressionVariable;
ExpressionVariable.prototype.semanticCheck = semanticCheck;

function ExpressionVariable(opts) {
  var _this = this;

  Expression.call(_this, opts);
}

function semanticCheck(state) {
  var _this = this;

  if (state.scope.getVariable(_this.ident) === undefined) {
    parseError(
      'Undeclared variable in expression: ' + _this.ident,
      _this.loc,
      _this
    );
  }

  _this.type = state.scope.getVariable(_this.ident).type;
}

function create(opts) {
  return new ExpressionVariable(opts);
}
