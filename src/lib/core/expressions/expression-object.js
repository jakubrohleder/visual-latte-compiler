var CodeBlock = require('latte/code/code-block');
var Expression = require('./expression');

module.exports = {
  create: create
};

ExpressionObject.prototype = Object.create(Expression.prototype);
ExpressionObject.prototype.constructor = ExpressionObject;
ExpressionObject.prototype.semanticCheck = semanticCheck;
ExpressionObject.prototype.compile = compile;
ExpressionObject.prototype.toString = toString;

function ExpressionObject(opts) {
  var _this = this;

  Expression.call(_this, opts);
}

function create(opts) {
  return new ExpressionObject(opts);
}

function semanticCheck(state) {
  var _this = this;
  var type = state.scope.getType(_this.type);

  _this.type = type;
}

function compile(state) {
  var _this = this;
  var code = CodeBlock.create(_this)
    .add(_this.type.compile(state, _this))
  ;

  _this.value.expr = _this;

  return code;
}

function toString() {
  var _this = this;

  return _this.text;
}
