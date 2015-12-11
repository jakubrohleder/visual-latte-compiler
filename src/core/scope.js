var _ = require('lodash');
var Variable = require('./variable');

var exports = module.exports = {};

exports.create = create;

Scope.prototype.addFunction = addFunction;
Scope.prototype.addVariable = addVariable;
Scope.prototype.addVariables = addVariables;
Scope.prototype.addElement = addElement;
Scope.prototype.getVariable = getVariable;
Scope.prototype.getFunction = getFunction;
Scope.prototype.staticCheck = staticCheck;

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

  if(_.isArray(element)) {
    _this.elements = _this.elements.concat(_.flattenDeep(element));
  } else {
    _this.elements.push(element);
  }
}

function getVariable(ident) {
  var _this = this;
  if (_this.vars[ident] !== undefined) {
    return _this.vars[ident];
  } else if (_this.parent === undefined) {
    return false;
  } else {
    return _this.parent.getVariable(ident);
  }
}

function getFunction(ident) {
  var _this = this;
  if (_this.functions[ident] !== undefined) {
    return _this.functions[ident];
  } else if (_this.parent === undefined) {
    return false;
  } else {
    return _this.parent.getFunction(ident);
  }
}

function staticCheck() {
  var _this = this;

  _this.checked = true;

  _.forEach(_this.elements, function (element) {
    element.staticCheck();
  });
}
