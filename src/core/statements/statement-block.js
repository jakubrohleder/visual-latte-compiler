var Statement = require('./statement-prototype');

module.exports = {
  create: create
};

StatementBlock.prototype = Object.create(Statement.prototype);
StatementBlock.prototype.constructor = StatementBlock;
StatementBlock.prototype.semanticCheck = semanticCheck;

function StatementBlock(opts) {
  var _this = this;

  Statement.call(_this, opts);
}

function semanticCheck(state) {
  var _this = this;

  _this.scope = state.pushScope();
  _this.block.semanticCheck(state);
  state.popScope();
}

function create(opts) {
  return new StatementBlock(opts);
}
