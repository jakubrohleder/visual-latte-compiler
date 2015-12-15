var Statement = require('./statement-prototype.js');
var parseError = require('../error').parseError;

module.exports = StatementWhile;

StatementWhile.prototype = Object.create(Statement.prototype);
StatementWhile.prototype.constructor = StatementWhile;
StatementWhile.prototype.semanticCheck = semanticCheck;

function StatementWhile(opts) {
  var _this = this;

  Statement.call(_this, opts);
}

function semanticCheck() {
  var _this = this;

  _this.expr.semanticCheck();

  if (_this.expr.type !== 'boolean') {
    parseError('Wrong type of if condition: ' + _this.expr.type + ' instead of boolean', _this);
  }

  _this.stmt.semanticCheck();
}
