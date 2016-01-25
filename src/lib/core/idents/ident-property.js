var CodeBlock = require('latte/code/code-block');
var parseError = require('latte/error').parseError;
var Element = require('latte/core/element');
var getFunctionName = require('latte/utils').getFunctionName;

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

function semanticCheck(state) {
  var _this = this;
  var property;

  _this.source.semanticCheck(state);

  property = _this.source.type.properties[_this.ident];

  if (property === undefined) {
    parseError(
      'Undeclared property ' + _this,
      _this.loc,
      _this
    );
  }

  _this.type = property.type;
  _this.address = property.address;
}

function create(opts) {
  return new IdentProperty(opts);
}

function compile(state) {
  var _this = this;

  var code = CodeBlock.create(_this).add(_this.source.compile(state));

  if (getFunctionName(_this.source) !== 'ExpressionParenthesis') {
    code.add('movq (%rax), %rax');
  }

  code.add('leaq ' + _this.address + '(%rax), %rax');

  return code;
}

function toString() {
  var _this = this;

  return '' + _this.source + '.' + _this.ident;
}
