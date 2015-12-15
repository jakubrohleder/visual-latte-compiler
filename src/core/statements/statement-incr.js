var Statement = require('./statement-prototype.js');
var parseError = require('../error').parseError;

module.exports = StatementIncr;

StatementIncr.prototype = Object.create(Statement.prototype);
StatementIncr.prototype.constructor = StatementIncr;
StatementIncr.prototype.semanticCheck = semanticCheck;

function StatementIncr(opts) {
  var _this = this;

  Statement.call(_this, opts);

  _this.ident = opts.ident;
}

function semanticCheck() {
  var _this = this;

  if (_this.scope.getVariable(_this.ident) === false) {
    parseError(
      'Undeclared variable to increment: ' + _this.ident,
      _this.loc,
      _this
    );
  }

  _this.type = _this.scope.getVariable(_this.ident).type;
}
