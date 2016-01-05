var CodeBlock = require('latte/code/code-block');
var parseError = require('latte/error').parseError;

var Expression = require('./expression');

module.exports = {
  create: create
};

ExpressionUminus.prototype = Object.create(Expression.prototype);
ExpressionUminus.prototype.constructor = ExpressionUminus;
ExpressionUminus.prototype.semanticCheck = semanticCheck;
ExpressionUminus.prototype.compile = compile;
ExpressionUminus.prototype.toString = toString;

function ExpressionUminus(opts) {
  var _this = this;

  Expression.call(_this, opts);
}

function semanticCheck(state) {
  var _this = this;
  var integer = state.scope.getType('int');

  _this.expr.semanticCheck(state);

  if (_this.expr.type !== integer) {
    parseError(
      'Wrong type for integer negation \'' + _this.expr.type + '\' instead of \'int\'',
      _this.loc,
      _this
    );
  }

  _this.type = _this.expr.type;
}

function create(opts) {
  return new ExpressionUminus(opts);
}

function compile() {
  var _this = this;

  return CodeBlock.create(_this)
    .add('xorq $1, %rax')
  ;
}

function toString() {
  var _this = this;

  return '!' + _this.expr;
}
