var Element = require('./element.js');
var _ = require('lodash');
var exports = module.exports = {};

exports.create = create;
exports.constructor = Function;

Function.prototype = Object.create(Element.prototype);
Function.prototype.constructor = Function;
Function.prototype.semanticCheck = semanticCheck;

function Function(opts) {
  var _this = this;

  Element.call(_this, opts);

  _this.parent.addFunction(_this);
}

function create(opts) {
  return new Function(opts);
}

function semanticCheck() {
  var _this = this;

  _this.scope.semanticCheck();
}
