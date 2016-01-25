var Type = require('./type').constr;

TypeVoid.prototype = Object.create(Type.prototype);
TypeVoid.prototype.constructor = TypeVoid;
TypeVoid.prototype.semanticCheck = semanticCheck;
TypeVoid.prototype.compile = compile;
TypeVoid.prototype.eq = eq;

module.exports = new TypeVoid();

function TypeVoid() {
  var _this = this;

  Type.call(_this);

  _this.builtin = true;
  _this.name = 'void';
}

function eq(argument) {
  return argument === this;
}

function semanticCheck() {
  // empty
}

function compile() {
  // empty
}
