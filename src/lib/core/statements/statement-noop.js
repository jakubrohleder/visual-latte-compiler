var Statement = require('./statement-prototype');

module.exports = {
  create: create
};

StatementNoop.prototype = Object.create(Statement.prototype);
StatementNoop.prototype.constructor = StatementNoop;
StatementNoop.prototype.semanticCheck = semanticCheck;
StatementNoop.prototype.compile = compile;

function StatementNoop(opts) {
  var _this = this;

  Statement.call(_this, opts);
}

function semanticCheck() {

}

function create(opts) {
  return new StatementNoop(opts);
}

function compile() {

}
