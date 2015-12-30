var parseError = require('../error').parseError;
var Scope = require('./scope').Scope;
var FunctionError = require('../functions/function-error');
var FunctionPrintInt = require('../functions/function-printInt');
var FunctionPrintString = require('../functions/function-printString');
var FunctionReadInt = require('../functions/function-readInt');
var FunctionReadString = require('../functions/function-readString');

var TypeInt = require('../types/type-int');
var TypeString = require('../types/type-string');
var TypeVoid = require('../types/type-void');
var TypeBoolean = require('../types/type-boolean');

var _ = require('lodash');

var exports = module.exports = {};

exports.create = create;

RootScope.prototype = Object.create(Scope.prototype);
RootScope.prototype.constructor = RootScope;
RootScope.prototype.optimize = optimize;

function RootScope(opts) {
  var _this = this;

  Scope.call(_this, opts);

  _this.addType(new TypeInt(_this));
  _this.addType(new TypeString(_this));
  _this.addType(new TypeVoid(_this));
  _this.addType(new TypeBoolean(_this));

  _this.addFunction(new FunctionError(_this));
  _this.addFunction(new FunctionPrintInt(_this));
  _this.addFunction(new FunctionPrintString(_this));
  _this.addFunction(new FunctionReadInt(_this));
  _this.addFunction(new FunctionReadString(_this));

  _this.root = true;
}

function create(opts) {
  return new RootScope(opts);
}

function optimize() {
  var _this = this;

  Scope.prototype.optimize.call(_this);
}
