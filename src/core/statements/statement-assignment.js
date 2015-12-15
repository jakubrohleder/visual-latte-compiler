var Statement = require('./statement-prototype.js');
var parseError = require('../error').parseError;

module.exports = StatementAssignment;

StatementAssignment.prototype = Object.create(Statement.prototype);
StatementAssignment.prototype.constructor = StatementAssignment;
StatementAssignment.prototype.staticCheck = staticCheck;

function StatementAssignment(opts) {
  var _this = this;

  Statement.call(_this, opts);
}

function staticCheck() {
  var _this = this;

  _this.expr.staticCheck();

  if(_this.scope.getVariable(_this.ident) === false) {
    parseError('Undeclared variable in assigment: ' + _this.ident, _this);
  }

  _this.type = _this.scope.getVariable(_this.ident).type;

  if(_this.expr.type !== _this.type) {
    parseError('Wrong type for assigment: ' + _this.expr.type + ' instead of ' + _this.type, _this);
  }
}
