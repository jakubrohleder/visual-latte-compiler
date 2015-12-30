var Statement = require('./statement-prototype');
var parseError = require('../error').parseError;

module.exports = {
  create: create
};

StatementDecr.prototype = Object.create(Statement.prototype);
StatementDecr.prototype.constructor = StatementDecr;
StatementDecr.prototype.semanticCheck = semanticCheck;

function StatementDecr(opts) {
  var _this = this;

  Statement.call(_this, opts);
}

function semanticCheck(state) {
  var _this = this;
  var variable = state.scope.getVariable(_this.ident);
  var integer = state.scope.getType('int');

  if (variable === undefined) {
    parseError(
      'Undeclared variable to decrement: ' + _this.ident,
      _this.loc,
      _this
    );
  }

  if (variable.type !== integer) {
    parseError(
      'Can\'t decrement \'' + variable.type + '\' works only for \'' + integer + '\'',
      _this.loc[_this.loc.length - 3],
      _this
    );
  }
}

function create(opts) {
  return new StatementDecr(opts);
}
