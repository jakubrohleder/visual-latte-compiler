var CodeBlock = require('latte/code/code-block');
var parseError = require('latte/error').parseError;
var Element = require('latte/core/element');
var getFunctionName = require('latte/utils').getFunctionName;
var Self = require('latte/core/self');

module.exports = {
  create: create
};

IdentProperty.prototype = Object.create(Element.prototype);
IdentProperty.prototype.constructor = IdentProperty;
IdentProperty.prototype.semanticCheck = semanticCheck;
IdentProperty.prototype.compile = compile;
IdentProperty.prototype.toString = toString;

function IdentProperty(opts) {
  var _this = this;

  Element.call(_this, opts);
}

function semanticCheck(state, fun) {
  var _this = this;
  var property;

  _this.source.semanticCheck(state);

  if (fun === true) {
    property = _this.source.type.functions[_this.ident];
    _this.function = property;
  } else {
    property = _this.source.type.properties[_this.ident];
  }

  if (property === undefined) {
    parseError(
      'Undeclared property ' + _this,
      _this.loc,
      _this
    );
  }

  _this.type = property.type;
  _this.addressShift = property.addressShift;
}

function create(opts) {
  return new IdentProperty(opts);
}

function compile(state) {
  var _this = this;

  var code = CodeBlock.create(_this).add(_this.source.compile(state));

  if (getFunctionName(_this.source) !== 'ExpressionParenthesis' && _this.source !== Self) {
    code.add('movq (%rax), %rax');
  }

  code
    .add('movq %rax, %rdi')
    .add('leaq ' + _this.addressShift + '(%rax), %rax');

  return code;
}

function toString() {
  var _this = this;

  return '' + _this.source + '.' + _this.ident;
}
