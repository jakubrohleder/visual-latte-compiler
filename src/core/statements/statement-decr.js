var Statement = require('./statement-prototype.js');
var parseError = require('../error').parseError;

module.exports = StatementDecr;

StatementDecr.prototype = Object.create(Statement.prototype);
StatementDecr.prototype.constructor = StatementDecr;
StatementDecr.prototype.staticCheck = staticCheck;

function StatementDecr(opts) {
  var _this = this;

  Statement.call(_this, opts);
}

function staticCheck() {
  var _this = this;

  if(_this.scope.getVariable(_this.ident) === false) {
    parseError('Undeclared variable to decrement: ' + _this.ident, _this);
  }

  _this.type = _this.scope.getVariable(_this.ident).type;
}
