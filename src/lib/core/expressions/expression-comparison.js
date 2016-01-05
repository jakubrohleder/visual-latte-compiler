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
ExpressionComparison.prototype.toString = toString;

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
  var operator = _this.left.type.operators.binary[_this.operator];

  return CodeBlock.create(_this)
    .add(_this.right.compile(state))
    .add('movq %rax, ' + state.pushRegister())
    .add(_this.left.compile(state))
    .add(CodeBlock.create(undefined, 'Comparison')
      .add('cmpq ' + state.popRegister() + ', %rax')
      .add(operator.compile(state) + ' ' + right)
      .add('movq $0, %rax')
      .add('jmp ' + end)
      .add(right + ':', 'right label', -1)
      .add('movq $1, %rax')
      .add(end + ':', 'end label', -1)
    )
  ;
}

function toString() {
  var _this = this;

  return '' + _this.left + ' ' + _this.operator + ' ' + _this.right;
}
