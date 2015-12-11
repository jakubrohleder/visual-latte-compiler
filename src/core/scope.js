var _ = require('lodash');
var Variable = require('./variable');

var exports = module.exports = {};

exports.create = create;

function Scope(opts) {
  var _this = this;

  opts = opts || {};

  _this.functions = {};
  _this.vars = {};
  _this.elements = [];

  _this.parent = opts.parent;

  _.forEach(opts.vars, _this.addVariable.bind(_this));
}

function create(opts) {
  return new Scope(opts);
}

Scope.prototype.addFunction = addFunction;
Scope.prototype.addVariable = addVariable;
Scope.prototype.addVariables = addVariables;
Scope.prototype.addElement = addElement;

function addFunction(fun) {
  var _this = this;

  if (_this.functions[fun.ident] !== undefined) {
    console.log('Redefining function', fun.ident);
  }
  _this.functions[fun.ident] = fun;
}

function addVariable(variable) {
  var _this = this;

  if (_this.vars[variable.ident] !== undefined) {
    console.log('Redefining variable', variable.ident);
  }
  _this.vars[variable.ident] = variable;
}

function addVariables(type, idents) {
  var _this = this;

  _.forEach(idents, function(ident) {
    _this.addVariable(Variable.create({
      type: type,
      ident: ident
    }))
  })
}

function addElement(element) {
  var _this = this;

  _this.elements.push(element);
}