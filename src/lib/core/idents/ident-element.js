var CodeBlock = require('latte/code/code-block');
var parseError = require('latte/error').parseError;
var Element = require('latte/core/element');
var TypeInt = require('latte/core/types/type-int');
var Value = require('latte/core/value');

module.exports = {
  create: create
};

IdentElement.prototype = Object.create(Element.prototype);
IdentElement.prototype.constructor = IdentElement;
IdentElement.prototype.semanticCheck = semanticCheck;
IdentElement.prototype.compile = compile;
IdentElement.prototype.toString = toString;

function IdentElement(opts) {
  var _this = this;

  Element.call(_this, opts);
}

function semanticCheck(state) {
  var _this = this;

  _this.expr.semanticCheck(state);
  if (_this.expr.type !== TypeInt) {
    parseError(
      'Wrong type for array index \'' + _this.expr.type + '\' instead of \'int\'',
      _this.loc,
      _this
    );
  }

  _this.source.semanticCheck(state);
  _this.type = _this.source.type.elementType;
}

function create(opts) {
  return new IdentElement(opts);
}

function compile(state) {
  var _this = this;

  _this.value = Value.create({
    type: _this.type
  });

  return CodeBlock.create(_this)
      .add(_this.source.compile(state))
      .add('movq (%rax), %rax')
      .add('movq %rax, ' + state.pushRegister())
      .add(_this.expr.compile(state))
      .add('leaq 8(' + state.popRegister() + ', %rax, ' + _this.type.size + '), %rax')
  ;
}

function toString() {
  var _this = this;

  return '' + _this.source + '[' + _this.expr + ']';
}
