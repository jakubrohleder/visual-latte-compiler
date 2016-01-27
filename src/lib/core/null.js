var CodeBlock = require('latte/code/code-block');

module.exports = new ExpressionNull();

ExpressionNull.prototype.semanticCheck = semanticCheck;
ExpressionNull.prototype.compile = compile;
ExpressionNull.prototype.toString = toString;
ExpressionNull.prototype.compileFree = compileFree;
ExpressionNull.prototype.compileRef = compileRef;
ExpressionNull.prototype.eq = eq;

function ExpressionNull() {
  var _this = this;

  _this.type = _this;
}

function semanticCheck() {
// empty
}

function compileFree() {
// empty
}

function compileRef() {
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

function eq(argument) {
  return argument === this;
}
