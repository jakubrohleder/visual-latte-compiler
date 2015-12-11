var Statement = require('./statement-prototype.js');
var exports = module.exports = StatementReturn;

function StatementReturn(opts) {
  var _this = this;

  Statement.call(_this, opts);

  _this.value = opts.value;
}

StatementReturn.prototype = Object.create(Statement.prototype);
StatementReturn.prototype.constructor = StatementReturn;
