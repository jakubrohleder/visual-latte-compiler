var Statement = require('./statement');

var CodeBlock = require('latte/code/code-block');

module.exports = {
  create: create
};

StatementExpression.prototype = Object.create(Statement.prototype);
StatementExpression.prototype.constructor = StatementExpression;
StatementExpression.prototype.semanticCheck = semanticCheck;
StatementExpression.prototype.compile = compile;

function StatementExpression(opts) {
  var _this = this;

  Statement.call(_this, opts);
}

function semanticCheck(state) {
  var _this = this;

  _this.expr.semanticCheck(state);
}

function create(opts) {
  return new StatementExpression(opts);
}

function compile(state) {
  var _this = this;
  return CodeBlock.create(_this)
    .add(_this.expr.compile(state))
    // .add(_this.expr.value.free(state))
  ;
}
