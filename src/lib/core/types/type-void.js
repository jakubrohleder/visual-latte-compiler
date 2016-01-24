var _ = require('lodash');

var Type = require('./type').constr;

TypeVoid.prototype = Object.create(Type.prototype);
TypeVoid.prototype.constructor = TypeVoid;
TypeVoid.prototype.semanticCheck = semanticCheck;
TypeVoid.prototype.compile = compile;

module.exports = new TypeVoid();

function TypeVoid() {
  var _this = this;

  Type.call(_this);

  _this.builtin = true;
  _this.name = 'void';
}

function semanticCheck() {
  // empty
}

function compile() {
  // empty
}
