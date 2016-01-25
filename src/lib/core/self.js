var CodeBlock = require('latte/code/code-block');

module.exports = new ExpressionSelf();

ExpressionSelf.prototype.semanticCheck = semanticCheck;
ExpressionSelf.prototype.compile = compile;
ExpressionSelf.prototype.toString = toString;
ExpressionSelf.prototype.eq = eq;

function ExpressionSelf() {

}

function semanticCheck(state) {
  var _this = this;

  _this.type = state.type;
}

function compile() {
  var _this = this;

  return CodeBlock.create(_this)
    .add('movq %rbx, %rax')
  ;
}

function toString() {
  return 'SELF';
}

function eq(argument) {
  return argument === this;
}
