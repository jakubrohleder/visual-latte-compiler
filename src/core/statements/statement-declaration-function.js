var _ = require('lodash');

var Statement = require('./statement-prototype');
var _Function = require('../functions/function');
var parseError = require('../error').parseError;

module.exports = {
  create: create
};

StatementDeclarationFunction.prototype = Object.create(Statement.prototype);
StatementDeclarationFunction.prototype.constructor = StatementDeclarationFunction;
StatementDeclarationFunction.prototype.semanticCheck = semanticCheck;

function StatementDeclarationFunction(opts) {
  var _this = this;

  Statement.call(_this, opts);
}

function semanticCheck(state) {
  var _this = this;
  var type = state.scope.getType(_this.type);

  if (type === undefined) {
    parseError(
      'Undeclared function type ' + _this.type,
      _this.loc,
      _this
    );
  }

  _this.type = type;

  _.forEach(_this.args, function(arg) {
    arg.semanticCheck(state);
  });

  _this.function = _Function.create({
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
