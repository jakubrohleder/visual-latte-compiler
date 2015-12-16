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
      'Can\'t increment \'' + variable.type + '\' works only for \'int\'',
      _this.loc[_this.loc.length - 3],
      _this
    );
  }

  _this.type = variable.type;
}
