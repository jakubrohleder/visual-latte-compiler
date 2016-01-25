var Statement = require('./statement');

var parseError = require('latte/error').parseError;
var CodeBlock = require('latte/code/code-block');

module.exports = {
  create: create
};

StatementAssignment.prototype = Object.create(Statement.prototype);
StatementAssignment.prototype.constructor = StatementAssignment;
StatementAssignment.prototype.semanticCheck = semanticCheck;
StatementAssignment.prototype.compile = compile;

function StatementAssignment(opts) {
  var _this = this;

  Statement.call(_this, opts);
}

function semanticCheck(state) {
  var _this = this;

  _this.ident.semanticCheck(state);
  _this.expr.semanticCheck(state);

  _this.type = _this.ident.type;

  if (!_this.type.eq(_this.expr.type)) {
    parseError(
      'Wrong type for assigment: ' + _this.expr.type + ' instead of ' + _this.type,
      _this.loc[_this.loc.length - 2],
      _this
    );
  }
}

function compile(state) {
  var _this = this;
  var code;

  code = CodeBlock.create(_this)
    .add(_this.expr.compile(state))
    .add('movq %rax, ' + state.pushRegister())
    // .add(_this.ident.value.removeReference(_this.variable, _this.ident, state))
    .add(_this.ident.compile(state))
    .add('movq ' + state.popRegister() + ', %rdx')
    .add('movq %rdx, (%rax)', 'save ' + _this.expr + ' on ' + _this.ident)
  ;

  // _this.expr.value.addReference(_this.variable);
  // _this.variable.value = _this.expr.value;

  return code;
}

function create(opts) {
  return new StatementAssignment(opts);
}
