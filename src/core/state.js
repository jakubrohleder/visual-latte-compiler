var RootScope = require('./scopes/scope-root');
var Scope = require('./scopes/scope');

var exports = module.exports = {};

exports.create = create;

State.prototype.pushFunction = pushFunction;
State.prototype.popFunction = popFunction;
State.prototype.pushScope = pushScope;
State.prototype.popScope = popScope;

function State(opts) {
  var _this = this;
  var rootScope = RootScope.create();

  opts = opts || {};

  _this.rootScope = rootScope;
  _this.functions = [];
  _this.scopes = [rootScope];
  _this.scope = rootScope;
}

function create(opts) {
  return new State(opts);
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

function pushScope() {
  var _this = this;
  var scope = Scope.create({
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
