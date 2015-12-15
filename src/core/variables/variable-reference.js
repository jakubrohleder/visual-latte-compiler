var Element = require('../element.js');
var exports = module.exports = {};

exports.create = create;

VariableReference.prototype = Object.create(Element.prototype);
VariableReference.prototype.constructor = VariableReference;

function VariableReference(opts) {
  var _this = this;

  Element.call(_this, opts);
}

function create(opts) {
  return new VariableReference(opts);
}
