var Statement = require('./statement-prototype.js');
var parseError = require('../error').parseError;

module.exports = StatementDecr;

StatementDecr.prototype = Object.create(Statement.prototype);
StatementDecr.prototype.constructor = StatementDecr;
StatementDecr.prototype.semanticCheck = semanticCheck;

function StatementDecr(opts) {
  var _this = this;

  Statement.call(_this, opts);
}

function semanticCheck() {
  var _this = this;
  var variable = _this.scope.getVariable(_this.ident);

  if (variable === undefined) {
    parseError(
      'Undeclared variable to decrement: ' + _this.ident,
      _this.loc,
      _this
    );
  }

  if (variable.type !== 'int') {
    parseError(
      'Can\'t decrement \'' + variable.type + '\' works only for \'int\'',
      _this.loc[_this.loc.length - 3],
      _this
    );
  }

  _this.type = variable.type;
}
