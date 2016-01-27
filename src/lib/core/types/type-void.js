var Type = require('./type').constr;

TypeVoid.prototype = Object.create(Type.prototype);
TypeVoid.prototype.constructor = TypeVoid;
TypeVoid.prototype.compileValue = compileValue;
TypeVoid.prototype.compile = compile;
TypeVoid.prototype.compileFree = compileFree;
TypeVoid.prototype.compileRef = compileRef;
TypeVoid.prototype.semanticCheck = semanticCheck;
TypeVoid.prototype.semanticCheckValue = semanticCheckValue;
TypeVoid.prototype.defaultValueExpr = defaultValueExpr;
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

function compileValue() {
  // empty
}

function compileFree() {
  // empty
}

function compileRef() {
  // empty
}

function semanticCheckValue() {
  // empty
}

function defaultValueExpr() {
  // empty
}
