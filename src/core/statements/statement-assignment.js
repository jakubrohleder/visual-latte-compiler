var Statement = require('./statement-prototype.js');
var exports = module.exports = StatementAssignment;

function StatementAssignment(opts) {
  var _this = this;

  Statement.call(_this, opts);

  _this.ident = opts.ident;
  _this.value = opts.value;

  // TODO check if exists
}

StatementAssignment.prototype = Object.create(Statement.prototype);
StatementAssignment.prototype.constructor = StatementAssignment;
