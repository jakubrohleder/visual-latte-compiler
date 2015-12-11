var Statement = require('./statement-prototype.js');

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
  _this.right.staticCheck();
  _this.wrong.staticCheck();
}