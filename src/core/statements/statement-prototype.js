var Element = require('../element.js');
var exports = module.exports = Statement;

exports.Statement = Statement;

function Statement(opts) {
  var _this = this;

  Element.call(_this, opts);
}

Statement.prototype = Object.create(Element.prototype);
Statement.prototype.constructor = Element;
