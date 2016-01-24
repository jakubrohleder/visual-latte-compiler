var CodeBlock = require('latte/code/code-block');
var parseError = require('latte/error').parseError;
var Value = require('latte/core/value');

var Expression = require('./expression');

module.exports = {
  create: create
};

ExpressionOperation.prototype = Object.create(Expression.prototype);
ExpressionOperation.prototype.constructor = ExpressionOperation;
ExpressionOperation.prototype.semanticCheck = semanticCheck;
ExpressionOperation.prototype.compile = compile;
ExpressionOperation.prototype.toString = toString;

function ExpressionOperation(opts) {
  var _this = this;

  Expression.call(_this, opts);
}

function create(opts) {
  return new ExpressionOperation(opts);
}

function semanticCheck(state) {
  var _this = this;
  var operator;

  _this.left.semanticCheck(state);
  _this.right.semanticCheck(state);

  if (_this.left.type !== _this.right.type) {
    parseError(
      'Can\'t process diferent type: ' + _this.left.type + ' and ' + _this.right.type,
      _this.loc,
      _this
    );
  }

  operator = _this.left.type.operators.binary[_this.operator];

  if (operator === undefined) {
    parseError(
      'No operator ' + _this.operator + ' for type ' + _this.left.type,
      _this.loc,
      _this
    );
  }

  _this.type = _this.left.type;
}

function compile(state) {
  var _this = this;
  var operator = _this.left.type.operators.binary[_this.operator];
  var rightRegister;
  var leftRegister;
  _this.value = Value.create({
    type: _this.type,
    expr: _this,
    register: '%rax'
  });

  var code = CodeBlock.create(_this, 'Operation ' + _this)
    .add(_this.right.compile(state))
  ;

  rightRegister = state.pushRegister();
  _this.right.value.register = rightRegister;

  code
    .add('movq %rax, ' + rightRegister)
    .add(_this.left.compile(state))
  ;

  leftRegister = state.pushRegister();
  _this.left.value.register = leftRegister;

  code
    .add('movq %rax, ' + leftRegister)
    .comment('Compiling operator')
    .add(operator.compile(state, leftRegister, rightRegister))
    .add('movq %rax, ' + state.pushRegister())
    // .add(_this.left.value.free(state))
    // .add(_this.right.value.free(state))
    .add('movq ' + state.popRegister() + ', %rax')
  ;

  state.popRegister();
  state.popRegister();

  return code;
}

function toString() {
  var _this = this;

  return '' + _this.left + ' ' + _this.operator + ' ' + _this.right;
}
