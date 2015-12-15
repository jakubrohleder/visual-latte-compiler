var parseError = require('../error').parseError;
var Scope = require('./scope').Scope;
var FunctionError = require('../functions/function-error');
var FunctionPrintInt = require('../functions/function-printInt');
var FunctionPrintString = require('../functions/function-printString');
var FunctionReadInt = require('../functions/function-readInt');
var FunctionReadString = require('../functions/function-readString');

var _ = require('lodash');

var exports = module.exports = {};

exports.create = create;

RootScope.prototype = Object.create(Scope.prototype);
RootScope.prototype.constructor = RootScope;
RootScope.prototype.semanticCheck = semanticCheck;
RootScope.prototype.optimize = optimize;

function RootScope(opts) {
  var _this = this;

  Scope.call(_this, opts);

  _this.addFunction(new FunctionError());
  _this.addFunction(new FunctionPrintInt());
  _this.addFunction(new FunctionPrintString());
  _this.addFunction(new FunctionReadInt());
  _this.addFunction(new FunctionReadString());

  _this.root = true;
}

function create(opts) {
  return new RootScope(opts);
}

function semanticCheck() {
  var _this = this;

  _.forEach(_this.elements, function(element) {
    _this.addFunction(element);
  });

  if (_this.functions.main === undefined) {
    parseError('Main function not declared', undefined, _this);
  }

  Scope.prototype.semanticCheck.call(_this);
}

function optimize() {
  var _this = this;

  Scope.prototype.optimize.call(_this);
}
