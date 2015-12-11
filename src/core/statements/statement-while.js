var Statement = require('./statement-prototype.js');
var exports = module.exports = StatementWhile;

function StatementWhile(opts) {
  var _this = this;

  Statement.call(_this, opts);

  _this.expr = opts.expr;
  _this.stmt = opts.stmt;
}

StatementWhile.prototype = Object.create(Statement.prototype);
StatementWhile.prototype.constructor = StatementWhile;
