var Statement = require('./statement');

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

  _this.ident = opts.ident;
}

function semanticCheck(state) {
  var _this = this;
  var variable = state.scope.getVariable(_this.ident);
  var integer = state.scope.getType('int');

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
      'Can\'t increment \'' + variable.type + '\' works only for \'' + integer + '\'',
      _this.loc[_this.loc.length - 3],
      _this
    );
  }
}

function create(opts) {
  return new StatementIncr(opts);
}

function compile() {
  var _this = this;

  return CodeBlock.create(_this)
    .add('movq ' + _this.variable.address + ', %rax')
    .add('incq %rax')
    .add('movq %rax, ' + _this.variable.address)
  ;
}
