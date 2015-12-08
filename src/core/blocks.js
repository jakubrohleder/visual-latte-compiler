var Element = require('./element.js').Element;
var exports = module.exports = {};

exports.create = create;

function Block(opts) {
  var _this = this;

  Element.call(_this, opts);
}

Block.prototype = Object.create(Element.prototype);
Block.prototype.constructor = Element;

function create(opts) {
  return new Block(opts);
}
