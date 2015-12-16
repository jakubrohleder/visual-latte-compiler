var Expression = require('./expression-prototype');
var parseError = require('../error').parseError;

module.exports = ExpressionVariable;

ExpressionVariable.prototype = Object.create(Expression.prototype);
ExpressionVariable.prototype.constructor = ExpressionVariable;
ExpressionVariable.prototype.semanticCheck = semanticCheck;

function ExpressionVariable(opts) {
  var _this = this;

  Expression.call(_this, opts);
}

function semanticCheck() {
  var _this = this;

  if (_this.scope.getVariable(_this.ident) === undefined) {
    parseError(
      'Undeclared variable in expression: ' + _this.ident,
      _this.loc,
      _this
    );
  }

  _this.type = _this.scope.getVariable(_this.ident).type;
}
