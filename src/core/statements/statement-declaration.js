var Statement = require('./statement-prototype.js');

module.exports = StatementDeclaration;

StatementDeclaration.prototype = Object.create(Statement.prototype);
StatementDeclaration.prototype.constructor = StatementDeclaration;
StatementDeclaration.prototype.semanticCheck = semanticCheck;

function StatementDeclaration(opts) {
  var _this = this;

  Statement.call(_this, opts);
}

function semanticCheck() {
  var _this = this;

  _this.scope.addVariable(_this);
}
