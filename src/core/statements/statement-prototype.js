var Element = require('../element.js');

module.exports = Statement;

Statement.prototype = Object.create(Element.prototype);
Statement.prototype.constructor = Statement;

function Statement(opts) {
  var _this = this;

  Element.call(_this, opts);
}
