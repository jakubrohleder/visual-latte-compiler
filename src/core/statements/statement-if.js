var Statement = require('./statement-prototype.js');
var parseError = require('../error').parseError;

module.exports = StatementIf;

StatementIf.prototype = Object.create(Statement.prototype);
StatementIf.prototype.constructor = StatementIf;
StatementIf.prototype.staticCheck = staticCheck;

function StatementIf(opts) {
  var _this = this;

  Statement.call(_this, opts);
}

function staticCheck() {
  var _this = this;

  _this.expr.staticCheck();

  if (_this.expr.type !== 'boolean') {
    parseError('Wrong type of if condition: ' + _this.expr.type + ' instead of boolean', _this);
  }

  _this.right.staticCheck();
  if (_this.wrong !== undefined) {
    _this.wrong.staticCheck();
  }
}