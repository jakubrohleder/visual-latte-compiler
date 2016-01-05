var Element = require('./element');
var nextMul = require('latte/utils').nextMul;

var exports = module.exports = {};

exports.create = create;

Stack.prototype = Object.create(Element.prototype);
Stack.prototype.constructor = Stack;
Stack.prototype.addFunctionCall = addFunctionCall;
Stack.prototype.addVariable = addVariable;
Stack.prototype.addArguments = addArguments;
Stack.prototype.shift = shift;
Stack.prototype.getOffset = getOffset;

function Stack() {
  var _this = this;

  _this.args = 0;
  _this.vars = 0;
  _this.extra = 0;
  _this.size = 0;
  _this.max = 0;
  _this.last = 0;
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

function shift(size) {
  var _this = this;

  _this.extra += size;

  return _this.extra;
}

function addArguments(args) {
  var _this = this;

  _this.args += args.length * 8;

  return _this.last;
}

function getOffset(base) {
  var _this = this;
  base = base || 16;

  return nextMul(_this.size, base) + _this.extra;
}
