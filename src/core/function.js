var Element = require('./element.js');
var exports = module.exports = {};

exports.create = create;
exports.constructor = Function;

function Function(opts) {
  var _this = this;

  _this.ident = opts.ident;
  _this.type = opts.type;
  _this.args = opts.args;
  _this.scope = opts.scope;

  Element.call(_this, opts);
}

Function.prototype = Object.create(Element.prototype);
Function.prototype.constructor = Function;

function create(opts) {
  return new Function(opts);
}
