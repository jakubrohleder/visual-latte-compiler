var _ = require('lodash');
var RootScope = require('./scopes/scope-root');
var Scope = require('./scopes/scope');
var Stack = require('./stack');

var exports = module.exports = {};

exports.create = create;

State.prototype.pushFunction = pushFunction;
State.prototype.popFunction = popFunction;
State.prototype.pushScope = pushScope;
State.prototype.popScope = popScope;
State.prototype.pushStack = pushStack;
State.prototype.popStack = popStack;
State.prototype.pushType = pushType;
State.prototype.popType = popType;

State.prototype.nextLabel = nextLabel;

State.prototype.pushRegister = pushRegister;
State.prototype.popRegister = popRegister;

function State(opts) {
  var _this = this;
  var rootScope = RootScope.create();
  var stack = Stack.create();

  _this.labelCount = 0;

  _.forEach(opts, function(value, key) {
    _this[key] = value;
  });

  _this.rootScope = rootScope;
  _this.functions = [];

  _this.types = [];

  _this.stack = stack;
  _this.stacks = [stack];

  _this.scopes = [rootScope];
  _this.scope = rootScope;
  _this.register;
}

function create(opts) {
  return new State(opts);
}

function nextLabel() {
  var _this = this;

  return '.L' + _this.labelCount++;
}

function pushFunction(fun) {
  var _this = this;

  _this.function = fun;
  _this.functions.push(fun);
}

function popFunction() {
  var _this = this;

  _this.functions.splice(-1, 1);
  _this.function = _this.functions.length > 0 ? _this.functions[_this.functions.length - 1] : undefined;
}

function pushType(type) {
  var _this = this;

  _this.type = type;
  _this.types.push(type);
}

function popType() {
  var _this = this;

  _this.types.splice(-1, 1);
  _this.type = _this.types.length > 0 ? _this.types[_this.types.length - 1] : undefined;
}

function pushStack() {
  var _this = this;

  _this.stack = Stack.create();
  _this.stacks.push(_this.stack);
}

function popStack() {
  var _this = this;

  _this.stacks.splice(-1, 1);
  _this.stack = _this.stacks.length > 0 ? _this.stacks[_this.stacks.length - 1] : undefined;
}

function pushScope(scope) {
  var _this = this;
  scope = scope || Scope.create({
    parent: _this.scope
  });

  _this.scope = scope;
  _this.scopes.push(scope);

  return scope;
}

function popScope() {
  var _this = this;

  _this.scopes.splice(-1, 1);
  _this.scope = _this.scopes.length > 0 ? _this.scopes[_this.scopes.length - 1] : undefined;
}

function pushRegister() {
  var _this = this;

  if (_this.function.register >= _this.function.registers.length) {
    _this.function.registers.push('' + (-_this.stack.addSpill()) + '(%rbp)');
  }

  if (_this.function.register >= _this.function.lastRegister) {
    _this.function.lastRegister = _this.function.register + 1;
  }

  _this.register = _this.function.registers[_this.function.register++];

  return _this.register;
}

function popRegister() {
  var _this = this;

  if (_this.function.register === 0) {
    throw('WRONG POP REGISTER');
  }

  return _this.function.registers[--_this.function.register];
}
