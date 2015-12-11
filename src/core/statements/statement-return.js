var Statement = require('./statement-prototype.js');

module.exports = StatementReturn;

StatementReturn.prototype = Object.create(Statement.prototype);
StatementReturn.prototype.constructor = StatementReturn;
StatementReturn.prototype.staticCheck = staticCheck;

function StatementReturn(opts) {
  var _this = this;

  Statement.call(_this, opts);
}

function staticCheck() {
  var _this = this;

  if (_this.expr !== undefined) {
    _this.expr.staticCheck();
  }
}
