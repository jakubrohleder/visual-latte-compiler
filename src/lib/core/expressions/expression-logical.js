var CodeBlock = require('latte/code/code-block');
var parseError = require('latte/error').parseError;

var Expression = require('./expression');

module.exports = {
  create: create
};

ExpressionLogical.prototype = Object.create(Expression.prototype);
ExpressionLogical.prototype.constructor = ExpressionLogical;
ExpressionLogical.prototype.semanticCheck = semanticCheck;
ExpressionLogical.prototype.compile = compile;
ExpressionLogical.prototype.toString = toString;

function ExpressionLogical(opts) {
  var _this = this;

  Expression.call(_this, opts);
}

function semanticCheck(state) {
  var _this = this;

  _this.left.semanticCheck(state);
  _this.right.semanticCheck(state);

  if (_this.left.type !== _this.right.type) {
    parseError(
      'Can\'t process diferent type: ' + _this.left.type + ' and ' + _this.right.type,
      _this.loc,
      _this
    );
  }

  _this.type = _this.left.type;
}

function create(opts) {
  return new ExpressionLogical(opts);
}

function compile(state) {
  var _this = this;
  var operator = _this.left.type.operators.binary[_this.operator];

  return CodeBlock.create(_this)
    .add(_this.left.compile(state))
    .add('movq %rax, ' + state.pushRegister())
    .add(_this.right.compile(state))
    .add(operator.compile(_this.operator));
}

function toString() {
  var _this = this;

  return '' + _this.left + ' ' + _this.operator + ' ' + _this.right;
}
