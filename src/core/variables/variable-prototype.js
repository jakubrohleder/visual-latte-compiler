var Element = require('../element.js');
var parseError = require('../error').parseError;

var exports = module.exports = {};

exports.create = create;

Variable.prototype = Object.create(Element.prototype);
Variable.prototype.constructor = Variable;
Variable.prototype.operation = operation;

function Variable(opts) {
  var _this = this;

  Element.call(_this, opts);
}

function create(opts) {
  return new Variable(opts);
}

function operation(sign, arg) {
  // parseError(
  //   'Void function can\'t return any value',
  //   _this.loc[_this.loc.length - 2],
  //   _this
  // );
}
