var Statement = require('./statement');
var _Function = require('../functions/function');
var FunctionMain = require('../functions/function-main');
var FunctionMethod = require('../functions/function-method');
var TypeArray = require('latte/core/types/type-array');
var encodeFunctionName = require('latte/utils').encodeFunctionName;

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
  var constructor = _Function;

  if (state.type !== undefined) {
    constructor = FunctionMethod;
  } else if (_this.name === 'main') {
    constructor = FunctionMain;
  }

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
  _this.ident = encodeFunctionName(_this, state.type);

  _.forEach(_this.args, function(arg) {
    arg.semanticCheck(state);
  });

  _this.function = constructor.create({
    type: _this.type,
    name: _this.name,
    ident: _this.ident,
    decl: _this,
    args: _this.args,
    block: _this.block,
    parent: state.type
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
