var CodeBlock = require('latte/code/code-block');
var Expression = require('./expression');
var getFunctionName = require('latte/utils').getFunctionName;

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

  _this.ident.semanticCheck(state);

  _this.type = _this.ident.type;
}

function compile(state) {
  var _this = this;
  var code = CodeBlock.create(_this)
    .add(_this.ident.compile(state));

  if (getFunctionName(_this.ident) !== 'ExpressionParenthesis') {
    code
     .add('movq (%rax), %rax');
  }

  return code;
}

function toString() {
  var _this = this;

  return '' + _this.ident;
}
