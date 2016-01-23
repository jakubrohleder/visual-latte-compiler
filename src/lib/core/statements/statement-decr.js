var Statement = require('./statement');

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
  var variable = state.scope.getVariable(_this.ident);
  var integer = state.rootScope.getType('int');

  if (variable === undefined) {
    parseError(
      'Undeclared variable to decrement: ' + _this.ident,
      _this.loc,
      _this
    );
  }

  _this.variable = variable;

  if (variable.type !== integer) {
    parseError(
      'Can\'t decrement \'' + variable.type + '\' works only for \'' + integer + '\'',
      _this.loc[_this.loc.length - 3],
      _this
    );
  }
}

function create(opts) {
  return new StatementDecr(opts);
}

function compile() {
  var _this = this;

  return CodeBlock.create(_this)
    .add('movq ' + _this.variable.address + ', %rax')
    .add('decq %rax')
    .add('movq %rax, ' + _this.variable.address)
  ;
}
