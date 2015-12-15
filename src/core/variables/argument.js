var Element = require('../element.js');
var exports = module.exports = {};

exports.create = create;

Argument.prototype = Object.create(Element.prototype);
Argument.prototype.constructor = Argument;

function Argument(opts) {
  var _this = this;

  Element.call(_this, opts);
}

function create(opts) {
  return new Argument(opts);
}
