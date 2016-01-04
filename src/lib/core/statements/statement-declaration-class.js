var Statement = require('./statement-prototype');
var Variable = require('../variable');

var parseError = require('latte/error').parseError;
var CodeBlock = require('latte/code/code-block');

module.exports = {
  create: create
};

StatementDeclarationClass.prototype = Object.create(Statement.prototype);
StatementDeclarationClass.prototype.constructor = StatementDeclarationClass;
StatementDeclarationClass.prototype.semanticCheck = semanticCheck;
StatementDeclarationClass.prototype.compile = compile;

function StatementDeclarationClass(opts) {
  var _this = this;

  Statement.call(_this, opts);
}

function semanticCheck(state) {
  var _this = this;
  var type = state.scope.getType(_this.type);

  if (type === undefined) {
    parseError(
      'Undeclared type ' + _this.type,
      _this.loc,
      _this
    );
  }

  _this.type = type;

  _this.variable = Variable.create({
    type: _this.type,
    ident: _this.ident,
    decl: _this
  });

  state.scope.addVariable(_this.variable);
}

function create(opts) {
  return new StatementDeclarationClass(opts);
}

function compile() {
  return [];
}
