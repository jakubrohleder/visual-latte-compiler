var CodeBlock = require('latte/code/code-block');
var parseError = require('latte/error').parseError;

var Expression = require('./expression');

module.exports = {
  create: create
};

ExpressionComparison.prototype = Object.create(Expression.prototype);
ExpressionComparison.prototype.constructor = ExpressionComparison;
ExpressionComparison.prototype.semanticCheck = semanticCheck;
ExpressionComparison.prototype.compile = compile;

function ExpressionComparison(opts) {
  var _this = this;

  Expression.call(_this, opts);
}

function semanticCheck(state) {
  var _this = this;
  var bool = state.scope.getType('boolean');

  _this.left.semanticCheck(state);
  _this.right.semanticCheck(state);

  if (_this.left.type !== _this.right.type) {
    parseError(
      'Can\'t compare diferent type variables: ' + _this.left.type + ' and ' + _this.right.type,
      _this.loc,
      _this
    );
  }

  _this.type = bool;
}

function create(opts) {
  return new ExpressionComparison(opts);
}

function compile(state) {
  var _this = this;
  var right = state.nextLabel();
  var end = state.nextLabel();

  return CodeBlock.create(_this)
    .add(_this.left.compile(state))
    .add('movl %eax, %edx')
    .add(_this.right.compile(state))
    .add(CodeBlock.create(undefined, 'Comparison')
      .add('compl %edx, %eax')
      .add(_this.left.type.operators.binary[_this.operator].compile(state) + ' ' + right)
      .add('movl $0 %eax')
      .add('jmp ' + end)
      .add(right + ':', 'right label', -1)
      .add('movl $1 %eax')
      .add(end + ':', 'end label', -1)
    )
  ;
}
