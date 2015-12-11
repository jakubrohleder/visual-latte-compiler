var Statement = require('./statement-prototype.js');
var exports = module.exports = StatementDecr;

function StatementDecr(opts) {
  var _this = this;

  Statement.call(_this, opts);

  _this.ident = opts.ident;
}

StatementDecr.prototype = Object.create(Statement.prototype);
StatementDecr.prototype.constructor = StatementDecr;
