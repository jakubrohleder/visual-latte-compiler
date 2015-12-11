var Element = require('./element.js');
var exports = module.exports = {};

exports.create = create;
exports.constructor = Function;

Function.prototype = Object.create(Element.prototype);
Function.prototype.constructor = Function;
Function.prototype.staticCheck = staticCheck;

function Function(opts) {
  var _this = this;

  Element.call(_this, opts);

  _this.parent.addFunction(_this);
}

function create(opts) {
  return new Function(opts);
}

function staticCheck() {
  var _this = this;

  _this.checked = true;

  _this.scope.staticCheck();
}
