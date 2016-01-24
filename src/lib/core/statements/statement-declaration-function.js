var Statement = require('./statement');
var _Function = require('../functions/function');
var FunctionMain = require('../functions/function-main');
var TypeArray = require('latte/core/types/type-array');

var parseError = require('latte/error').parseError;
var CodeBlock = require('latte/code/code-block');

var _ = require('lodash');

module.exports = {
  create: create
};

StatementDeclarationFunction.prototype = Object.create(Statement.prototype);
StatementDeclarationFunction.prototype.constructor = StatementDeclarationFunction;
StatementDeclarationFunction.prototype.semanticCheck = semanticCheck;
StatementDeclarationFunction.prototype.compile = compile;

function StatementDeclarationFunction(opts) {
  var _this = this;

  Statement.call(_this, opts);
}

function semanticCheck(state) {
  var _this = this;
  var type = state.scope.getType(_this.type);
  var constructor = _this.ident === 'main' ? FunctionMain : _Function;

  if (type === undefined) {
    parseError(
      'Undeclared function type ' + _this.type,
      _this.loc,
      _this
    );
  }

  if (_this.array === true) {
    type = TypeArray.create(type);
  }

  _this.type = type;

  _.forEach(_this.args, function(arg) {
    arg.semanticCheck(state);
  });

  _this.function = constructor.create({
    type: _this.type,
    ident: _this.ident,
    decl: _this,
    args: _this.args,
    block: _this.block
  });

  state.scope.addFunction(_this.function);
}

function create(opts) {
  return new StatementDeclarationFunction(opts);
}

function compile() {
  var _this = this;

  return CodeBlock.create(_this);
}
