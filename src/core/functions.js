var Element = require('./element.js').Element;
var exports = module.exports = {};

exports.create = create;

function Function(opts) {
  var _this = this;

  Element.call(_this, opts);
}

Function.prototype = Object.create(Element.prototype);
Function.prototype.constructor = Element;

function create(opts) {
  return new Function(opts);
}
