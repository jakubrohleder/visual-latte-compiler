var CodeBlock = require('latte/code/code-block');
var parseError = require('latte/error').parseError;

var Expression = require('./expression');

module.exports = {
  create: create
};

ExpressionVariable.prototype = Object.create(Expression.prototype);
ExpressionVariable.prototype.constructor = ExpressionVariable;
ExpressionVariable.prototype.semanticCheck = semanticCheck;
ExpressionVariable.prototype.compile = compile;
ExpressionVariable.prototype.toString = toString;

function ExpressionVariable(opts) {
  var _this = this;

  Expression.call(_this, opts);
}

function create(opts) {
  return new ExpressionVariable(opts);
}

function semanticCheck(state) {
  var _this = this;

  _this.variable = state.scope.getVariable(_this.ident);

  if (_this.variable === undefined) {
    parseError(
      'Undeclared variable in expression: ' + _this.ident,
      _this.loc,
      _this
    );
  }

  _this.type = _this.variable.type;
}

function compile() {
  var _this = this;

  return CodeBlock.create(_this)
    .add('movq ' + _this.variable.stack + '(%rbp), %rax')
  ;
}

function toString() {
  var _this = this;

  return _this.ident;
}
