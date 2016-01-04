var Statement = require('./statement-prototype');

var CodeBlock = require('latte/code/code-block');

module.exports = {
  create: create
};

StatementBlock.prototype = Object.create(Statement.prototype);
StatementBlock.prototype.constructor = StatementBlock;
StatementBlock.prototype.semanticCheck = semanticCheck;
StatementBlock.prototype.compile = compile;

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

function compile(state) {
  var _this = this;

  return CodeBlock.create(_this, 'StatementBlock')
    .add(_this.block.compile(state))
  ;
}
