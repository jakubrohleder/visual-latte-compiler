var Statement = require('./statement');

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

function semanticCheck(state, variable) {
  var _this = this;
  var scope = state.scope;

  _this.scope = state.pushScope();

  if (variable !== undefined) {
    _this.scope.addVariable(variable);
  }

  _this.block.semanticCheck(state);
  scope.return = _this.scope.return;
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
