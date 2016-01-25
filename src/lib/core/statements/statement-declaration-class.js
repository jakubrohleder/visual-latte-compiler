var Statement = require('./statement');
var Type = require('latte/core/types/type');

// var parseError = require('latte/error').parseError;
// var CodeBlock = require('latte/code/code-block');

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

  _this.type = Type.create({
    name: _this.name,
    block: _this.block,
    extends: _this.extends,
    decl: _this
  });

  state.scope.addType(_this.type);
}

function create(opts) {
  return new StatementDeclarationClass(opts);
}

function compile() {
  var _this = this;

  return CodeBlock.create(_this);
}
