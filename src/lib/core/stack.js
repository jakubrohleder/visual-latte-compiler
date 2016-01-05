var Element = require('./element');
var nextMul = require('latte/utils').nextMul;

var exports = module.exports = {};

exports.create = create;

Stack.prototype = Object.create(Element.prototype);
Stack.prototype.constructor = Stack;
Stack.prototype.addFunctionCall = addFunctionCall;
Stack.prototype.addVariable = addVariable;
Stack.prototype.addArgument = addArgument;
Stack.prototype.addShift = addShift;
Stack.prototype.addSpill = addSpill;
Stack.prototype.addRegister = addRegister;
Stack.prototype.getOffset = getOffset;

function Stack() {
  var _this = this;

  _this.args = 0;
  _this.vars = 0;
  _this.shift = 0;
  _this.size = 0;
  _this.max = 0;
  _this.spill = 0;
  _this.last = 0;
  _this.registers = 0;
}

function create(opts) {
  return new Stack(opts);
}

function addFunctionCall(fun) {
  var _this = this;

  if (fun.args.length > _this.max) {
    _this.size += (fun.args.length - _this.max) * 8;
    _this.max = fun.args.length;
  }
}

function addVariable(variable) {
  var _this = this;

  _this.size += variable.type.size;
  _this.last += variable.type.size;
  _this.vars += variable.type.size;

  return _this.last;
}

function addSpill() {
  var _this = this;
  var size = 8;

  _this.size += size;
  _this.last += size;
  _this.spill += size;

  return _this.last;
}

function addShift(size) {
  var _this = this;

  _this.shift += size;

  return _this.shift;
}

function addArgument() {
  var _this = this;
  var size = 8;

  _this.size += size;
  _this.last += size;
  _this.args += size;

  return _this.last;
}

function getOffset(base) {
  var _this = this;
  base = base || 16;

  return nextMul(_this.size, base) + _this.shift;
}

function addRegister() {
  var _this = this;
  var size = 8;

  _this.size += size;
  _this.last += size;
  _this.registers += size;

  return _this.last;
}
