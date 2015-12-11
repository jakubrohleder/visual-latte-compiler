var Element = require('./element.js');
var exports = module.exports = {};

exports.create = create;

Variable.prototype = Object.create(Element.prototype);
Variable.prototype.constructor = Element;

function Variable(opts) {
  var _this = this;

  Element.call(_this, opts);

  _this.type = opts.type;
  _this.ident = opts.ident;
}

function create(opts) {
  return new Variable(opts);
}
