var Statement = require('./statement-prototype');
var Variable = require('../variable');

var parseError = require('latte/error').parseError;
var CodeBlock = require('latte/code/code-block');

module.exports = {
  create: create
};

StatementDeclarationVariable.prototype = Object.create(Statement.prototype);
StatementDeclarationVariable.prototype.constructor = StatementDeclarationVariable;
StatementDeclarationVariable.prototype.semanticCheck = semanticCheck;
StatementDeclarationVariable.prototype.compile = compile;

function StatementDeclarationVariable(opts) {
  var _this = this;

  Statement.call(_this, opts);
}

function create(opts) {
  return new StatementDeclarationVariable(opts);
}

function semanticCheck(state) {
  var _this = this;
  var type = state.scope.getType(_this.type);

  if (type === undefined) {
    parseError(
      'Undeclared variable type ' + _this.type,
      _this.loc,
      _this
    );
  }

  _this.type = type;

  if (_this.expr === undefined) {
    _this.expr = type.defaultValueExpr(_this.loc[_this.loc.length - 2]);
  }
  _this.expr.semanticCheck(state);

  _this.variable = Variable.create({
    type: _this.type,
    ident: _this.ident,
    decl: _this
  });

  if (_this.expr.type !== type) {
    parseError(
      'Wrong type for assigment: ' + _this.expr.type + ' instead of ' + type,
      _this.loc[_this.loc.length - 2],
      _this
    );
  }

  state.scope.addVariable(_this.variable);
}

function compile(state) {
  var _this = this;

  _this.variable.stack = -state.stack.addVariable(_this.variable);

  return CodeBlock.create(_this)
    .comment('Declaring variable ' + _this.ident + ' on ' + _this.variable.stack + '(%rbp)')
    .add(_this.expr.compile(state))
    .add('movq %rax, ' + _this.variable.stack + '(%rbp)')
  ;
}
