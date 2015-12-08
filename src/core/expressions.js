var Element = require('./element.js').Element;
var exports = module.exports = {};

exports.create = create;

function Expression(opts) {
  var _this = this;

  Element.call(_this, opts);
}

Expression.prototype = Object.create(Element.prototype);
Expression.prototype.constructor = Element;

function create(opts) {
  return new Expression(opts);
}
