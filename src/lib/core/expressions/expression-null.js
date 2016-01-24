var CodeBlock = require('latte/code/code-block');

module.exports = {
  create: create
};

ExpressionNull.prototype.semanticCheck = semanticCheck;
ExpressionNull.prototype.compile = compile;
ExpressionNull.prototype.toString = toString;

function ExpressionNull() {

}

function create(opts) {
  return new ExpressionNull(opts);
}

function semanticCheck() {
// empty
}

function compile() {
  var _this = this;

  return CodeBlock.create(_this)
    .add('movq $0, %rax')
  ;
}

function toString() {
  return 'NULL';
}
