var Statement = require('./statement');
var TypeInt = require('latte/core/types/type-int');

var parseError = require('latte/error').parseError;
var CodeBlock = require('latte/code/code-block');

module.exports = {
  create: create
};

StatementDecr.prototype = Object.create(Statement.prototype);
StatementDecr.prototype.constructor = StatementDecr;
StatementDecr.prototype.semanticCheck = semanticCheck;
StatementDecr.prototype.compile = compile;

function StatementDecr(opts) {
  var _this = this;

  Statement.call(_this, opts);
}

function semanticCheck(state) {
  var _this = this;

  _this.ident.semanticCheck(state);

  if (!_this.ident.type.eq(TypeInt)) {
    parseError(
      'Can\'t decrement \'' + _this.ident.type + '\' works only for \'' + TypeInt + '\'',
      _this.loc[_this.loc.length - 3],
      _this
    );
  }
}

function create(opts) {
  return new StatementDecr(opts);
}

function compile(state) {
  var _this = this;

  return CodeBlock.create(_this)
    .add(_this.ident.compile(state))
    .add('decq (%rax)');
}
