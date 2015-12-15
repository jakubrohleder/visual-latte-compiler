var Statement = require('./statement-prototype.js');
var parseError = require('../error').parseError;

module.exports = StatementAssignment;

StatementAssignment.prototype = Object.create(Statement.prototype);
StatementAssignment.prototype.constructor = StatementAssignment;
StatementAssignment.prototype.semanticCheck = semanticCheck;

function StatementAssignment(opts) {
  var _this = this;

  Statement.call(_this, opts);
}

function semanticCheck() {
  var _this = this;

  _this.expr.semanticCheck();

  if(_this.scope.getVariable(_this.ident) === false) {
    parseError(
      'Undeclared variable in assigment: ' + _this.ident,
      _this.loc[_this.loc.length - 4],
      _this
    );
  }

  _this.type = _this.scope.getVariable(_this.ident).type;

  if(_this.expr.type !== _this.type) {
    parseError(
      'Wrong type for assigment: ' + _this.expr.type + ' instead of ' + _this.type,
      _this.loc[_this.loc.length - 2],
      _this
    );
  }
}
