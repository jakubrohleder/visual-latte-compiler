var Expression = require('./expression-prototype.js');
var parseError = require('../error').parseError;

module.exports = ExpressionFuncall;

ExpressionFuncall.prototype = Object.create(Expression.prototype);
ExpressionFuncall.prototype.constructor = ExpressionFuncall;
ExpressionFuncall.prototype.staticCheck = staticCheck;

function ExpressionFuncall(opts) {
  var _this = this;

  Expression.call(_this, opts);
}

function staticCheck() {
  var _this = this;

  if(_this.scope.getFunction(_this.ident) === false) {
    parseError('Undeclared variable in expression: ' + _this.ident, _this);
  }

  _this.type = _this.scope.getFunction(_this.ident).type;
}
