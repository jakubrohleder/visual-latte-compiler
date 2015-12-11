var Statement = require('./statement-prototype.js');
var exports = module.exports = StatementDeclaration;

function StatementDeclaration(opts) {
  var _this = this;

  Statement.call(_this, opts);

  _this.ident = opts.ident;
  _this.type = opts.varType;

  // TODO add to scope
}

StatementDeclaration.prototype = Object.create(Statement.prototype);
StatementDeclaration.prototype.constructor = StatementDeclaration;
