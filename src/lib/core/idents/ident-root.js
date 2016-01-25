var CodeBlock = require('latte/code/code-block');
var parseError = require('latte/error').parseError;
var Element = require('latte/core/element');

module.exports = {
  create: create
};

IdentRoot.prototype = Object.create(Element.prototype);
IdentRoot.prototype.constructor = IdentRoot;
IdentRoot.prototype.semanticCheck = semanticCheck;
IdentRoot.prototype.compile = compile;
IdentRoot.prototype.toString = toString;

function IdentRoot(opts) {
  var _this = this;

  Element.call(_this, opts);
}

function semanticCheck(state) {
  var _this = this;
  _this.variable = state.scope.getVariable(_this.text);

  if (_this.variable === undefined) {
    parseError(
      'Undeclared variable in expression: ' + _this.text,
      _this.loc,
      _this
    );
  }

  _this.type = _this.variable.type;
}

function create(opts) {
  return new IdentRoot(opts);
}

function compile() {
  var _this = this;

  return CodeBlock.create(_this)
    .add('leaq ' + _this.variable.address + ', %rax')
  ;
}


function toString() {
  return this.text;
}
