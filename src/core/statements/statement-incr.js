var Statement = require('./statement-prototype.js');
var exports = module.exports = StatementIncr;

function StatementIncr(opts) {
  var _this = this;

  Statement.call(_this, opts);

  _this.ident = opts.ident;
}

StatementIncr.prototype = Object.create(Statement.prototype);
StatementIncr.prototype.constructor = StatementIncr;
