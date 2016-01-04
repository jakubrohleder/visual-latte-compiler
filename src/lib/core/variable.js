var Element = require('./element');

var exports = module.exports = {};

exports.create = create;

Variable.prototype = Object.create(Element.prototype);
Variable.prototype.constructor = Variable;
Variable.prototype.toString = toString;

function Variable(opts) {
  var _this = this;

  Element.call(_this, opts);
}

function create(opts) {
  return new Variable(opts);
}

function toString() {
  return this.ident;
}
