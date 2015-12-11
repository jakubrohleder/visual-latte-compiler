var Element = require('./element.js');
var exports = module.exports = {};

exports.create = create;

function Variable(opts) {
  var _this = this;

  Element.call(_this, opts);

  _this.type = opts.type;
  _this.ident = opts.ident;
}

Variable.prototype = Object.create(Element.prototype);
Variable.prototype.constructor = Element;

function create(opts) {
  return new Variable(opts);
}
