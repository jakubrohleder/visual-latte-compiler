var Statement = require('./statement');
var TypeInt = require('latte/core/types/type-int');

var parseError = require('latte/error').parseError;
var CodeBlock = require('latte/code/code-block');

module.exports = {
  create: create
};

StatementIncr.prototype = Object.create(Statement.prototype);
StatementIncr.prototype.constructor = StatementIncr;
StatementIncr.prototype.semanticCheck = semanticCheck;
StatementIncr.prototype.compile = compile;

function StatementIncr(opts) {
  var _this = this;

  Statement.call(_this, opts);
}

function semanticCheck(state) {
  var _this = this;

  _this.ident.semanticCheck(state);

  if (!_this.ident.type.eq(TypeInt)) {
    parseError(
      'Can\'t increment \'' + _this.ident.type + '\' works only for \'' + TypeInt + '\'',
      _this.loc[_this.loc.length - 3],
      _this
    );
  }
}

function create(opts) {
  return new StatementIncr(opts);
}

function compile(state) {
  var _this = this;

  return CodeBlock.create(_this)
    .add(_this.ident.compile(state))
    .add('incq (%rax)');
}
