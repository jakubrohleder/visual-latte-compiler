var CodeBlock = require('latte/code/code-block');
var parseError = require('latte/error').parseError;
var Value = require('latte/core/value');

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
  var integer = state.rootScope.getType('int');

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

function compile(state) {
  var _this = this;
  _this.value = Value.create({
    type: _this.type,
    expr: _this,
    register: '%rax'
  });

  return CodeBlock.create(_this)
    .add(_this.expr.compile(state))
    .add('negq %rax')
  ;
}

function toString() {
  var _this = this;

  return '-' + _this.expr;
}
