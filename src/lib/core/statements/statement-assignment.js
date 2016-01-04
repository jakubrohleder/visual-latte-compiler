var Statement = require('./statement-prototype');

var parseError = require('latte/error').parseError;
var CodeBlock = require('latte/code/code-block');

module.exports = {
  create: create
};

StatementAssignment.prototype = Object.create(Statement.prototype);
StatementAssignment.prototype.constructor = StatementAssignment;
StatementAssignment.prototype.semanticCheck = semanticCheck;
StatementAssignment.prototype.compile = compile;

function StatementAssignment(opts) {
  var _this = this;

  Statement.call(_this, opts);
}

function semanticCheck(state) {
  var _this = this;
  var variable = state.scope.getVariable(_this.ident);

  _this.variable = variable;
  _this.expr.semanticCheck(state);

  if (variable === undefined) {
    parseError(
      'Undeclared variable in assigment: ' + _this.ident,
      _this.loc[_this.loc.length - 4],
      _this
    );
  }

  if (_this.expr.type !== variable.type) {
    parseError(
      'Wrong type for assigment: ' + _this.expr.type + ' instead of ' + variable.type,
      _this.loc[_this.loc.length - 2],
      _this
    );
  }
}

function compile(state) {
  var _this = this;

  return CodeBlock.create(_this)
    .add(_this.expr.compile(state))
    .add('movl %eax, ' + _this.variable.stack + '(%ebp)', 'save ' + _this.expr + ' on ' + _this.variable)
  ;
}

function create(opts) {
  return new StatementAssignment(opts);
}
