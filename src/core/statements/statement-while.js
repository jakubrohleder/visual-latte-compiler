var Statement = require('./statement-prototype.js');

module.exports = StatementWhile;

StatementWhile.prototype = Object.create(Statement.prototype);
StatementWhile.prototype.constructor = StatementWhile;
StatementWhile.prototype.staticCheck = staticCheck;

function StatementWhile(opts) {
  var _this = this;

  Statement.call(_this, opts);
}

function staticCheck() {
  var _this = this;

  _this.expr.staticCheck();
  _this.stmt.staticCheck();
}
