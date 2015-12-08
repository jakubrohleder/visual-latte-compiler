var Element = require('./element.js').Element;
var exports = module.exports = {};

exports.create = create;

function Statement(opts) {
  var _this = this;

  Element.call(_this, opts);
}

Statement.prototype = Object.create(Element.prototype);
Statement.prototype.constructor = Element;

function create(opts) {
  return new Statement(opts);
}
