var Statement = require('./statement-prototype');
var Variable = require('../variable');
var parseError = require('../error').parseError;

module.exports = {
  create: create
};

StatementDeclarationVariable.prototype = Object.create(Statement.prototype);
StatementDeclarationVariable.prototype.constructor = StatementDeclarationVariable;
StatementDeclarationVariable.prototype.semanticCheck = semanticCheck;

function StatementDeclarationVariable(opts) {
  var _this = this;

  Statement.call(_this, opts);
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

  _this.variable = Variable.create({
    type: _this.type,
    ident: _this.ident,
    decl: _this
  });

  state.scope.addVariable(_this.variable);
}

function create(opts) {
  return new StatementDeclarationVariable(opts);
}
