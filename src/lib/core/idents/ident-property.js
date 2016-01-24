var CodeBlock = require('latte/code/code-block');
var Element = require('latte/core/element');
var Value = require('latte/core/value');

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

  _this.source.semanticCheck(state);

  _this.type = _this.source.type.properties[_this.ident].type;
  _this.index = _this.source.type.properties[_this.ident].index;
}

function create(opts) {
  return new IdentProperty(opts);
}

function compile(state) {
  var _this = this;

  _this.value = Value.create({
    type: _this.type
  });

  return CodeBlock.create(_this)
      .add(_this.source.compile(state))
      .add('movq (%rax), %rax')
      .add('leaq ' + _this.index + '(%rax), %rax')
  ;
}

function toString() {
  var _this = this;

  return '' + _this.source + '.' + _this.ident;
}
