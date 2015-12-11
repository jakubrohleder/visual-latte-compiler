var Statement = require('./statement-prototype.js');
var exports = module.exports = StatementIf;

function StatementIf(opts) {
  var _this = this;

  Statement.call(_this, opts);

  _this.expr = opts.expr;
  _this.right = opts.right;
  _this.wrong = opts.wrong;
}

StatementIf.prototype = Object.create(Statement.prototype);
StatementIf.prototype.constructor = StatementIf;
