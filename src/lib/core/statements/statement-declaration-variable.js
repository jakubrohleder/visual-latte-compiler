var Statement = require('./statement');
var Variable = require('../variable');

var parseError = require('latte/error').parseError;
var CodeBlock = require('latte/code/code-block');
var TypeArray = require('latte/core/types/type-array');

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

  if (_this.array === true) {
    _this.type = TypeArray.create(type);
  } else {
    _this.type = type;
  }

  if (_this.expr === undefined) {
    _this.expr = _this.type.defaultValueExpr(_this.loc[_this.loc.length - 2], type);
  }

  _this.expr.semanticCheck(state);

  _this.variable = Variable.create({
    type: _this.type,
    ident: _this.ident,
    decl: _this
  });

  if (_this.array === true) {
    if (_this.expr.type.elementType !== type) {
      parseError(
        'Wrong type for assigment to array: ' + _this.expr.type + ' instead of ' + _this.type,
        _this.loc[_this.loc.length - 2],
        _this
      );
    }
  } else if (_this.expr.type !== _this.type) {
    parseError(
      'Wrong type for assigment: ' + _this.expr.type + ' instead of ' + _this.type,
      _this.loc[_this.loc.length - 2],
      _this
    );
  }

  state.scope.addVariable(_this.variable);
}

function compile(state) {
  var _this = this;
  var code;

  _this.variable.address = '' + -state.stack.addVariable(_this.variable) + '(%rbp)';

  code = CodeBlock.create(_this)
    .comment('Declaring variable ' + _this.ident + ' on ' + _this.variable.address)
    .add(_this.expr.compile(state))
    .add('movq %rax, ' + _this.variable.address)
  ;

  _this.variable.value = _this.expr.value;
  // _this.variable.value.addReference(_this.variable);

  return code;
}
