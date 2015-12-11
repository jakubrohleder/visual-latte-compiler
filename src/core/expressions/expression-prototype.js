var Element = require('../element.js');
var exports = module.exports = Expression;

exports.Expression = Expression;

Expression.prototype = Object.create(Element.prototype);
Expression.prototype.constructor = Element;

function Expression(opts) {
  var _this = this;

  Element.call(_this, opts);
}
