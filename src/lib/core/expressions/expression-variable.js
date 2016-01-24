var CodeBlock = require('latte/code/code-block');
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

  _this.ident.semanticCheck(state);

  _this.type = _this.ident.type;
}

function compile(state) {
  var _this = this;
  var code = _this.ident.compile(state);

  _this.value = _this.ident.value;

  return CodeBlock.create(_this)
    .add(code)
    .add('movq (%rax), %rax')
  ;
}

function toString() {
  var _this = this;

  return '' + _this.ident;
}
