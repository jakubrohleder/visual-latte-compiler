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
  var variable = _this.scope.getVariable(_this.ident);

  _this.expr.semanticCheck();

  if (variable === undefined) {
    parseError(
      'Undeclared variable in assigment: ' + _this.ident,
      _this.loc[_this.loc.length - 4],
      _this
    );
  }

  if (_this.expr.type !== variable.type) {
    parseError(
      'Wrong type for assigment: ' + _this.expr.type + ' instead of ' + _this.type,
      _this.loc[_this.loc.length - 2],
      _this
    );
  }

  _this.type = variable.type;
}
