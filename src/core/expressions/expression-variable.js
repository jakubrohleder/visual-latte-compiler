var Expression = require('./expression-prototype');
var parseError = require('../error').parseError;

module.exports = ExpressionVariable;

ExpressionVariable.prototype = Object.create(Expression.prototype);
ExpressionVariable.prototype.constructor = ExpressionVariable;
ExpressionVariable.prototype.staticCheck = staticCheck;

function ExpressionVariable(opts) {
  var _this = this;

  Expression.call(_this, opts);
}

function staticCheck() {
  var _this = this;

  if(_this.scope.getVariable(_this.ident) === false) {
    parseError('Undeclared variable in expression: ' + _this.ident, _this);
  }

  _this.type = _this.scope.getVariable(_this.ident).type;
}
