var _ = require('lodash');
var parseError = require('../error').parseError;

var exports = module.exports = {};

exports.create = create;
exports.Scope = Scope;

Scope.prototype.addFunction = addFunction;
Scope.prototype.addVariable = addVariable;
Scope.prototype.addElement = addElement;
Scope.prototype.getVariable = getVariable;
Scope.prototype.getFunction = getFunction;
Scope.prototype.semanticCheck = semanticCheck;
Scope.prototype.optimize = optimize;

function Scope(opts) {
  var _this = this;

  opts = opts || {};

  _this.opts = opts;

  _this.root = false;
  _this.functions = {};
  _this.variables = {};
  _this.elements = [];

  _this.state = {
    checked: false,
    optimized: false
  }

  _this.parent = opts.parent;
}

function create(opts) {
  return new Scope(opts);
}

function addFunction(fun) {
  var _this = this;

  if (_this.functions[fun.ident] !== undefined) {
    if(_this.functions[fun.ident].scope === _this) {
      parseError('Function ' + fun.ident + ' already defined', {loc: fun.loc});
    } else {
      console.log('Redefining function', fun.ident);
    }
  }
  _this.functions[fun.ident] = fun;
}

function addVariable(variable) {
  var _this = this;

  if (_this.variables[variable.ident] !== undefined) {
    if(_this.variables[variable.ident].scope === _this) {
      parseError(
        'Variable ' + variable.ident + ' already defined',
        variable.loc,
        _this
      );
    } else {
      console.log('Redefining variable', variable.ident);
    }
  }
  _this.variables[variable.ident] = variable;
}

function addElement(element) {
  var _this = this;

  if (element === undefined){
    return;
  } else if(_.isArray(element)) {
    _this.elements = _this.elements.concat(_.flattenDeep(element));
  } else {
    _this.elements.push(element);
  }
}

function getVariable(ident) {
  var _this = this;
  if (_this.variables[ident] !== undefined) {
    return _this.variables[ident];
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

function semanticCheck() {
  var _this = this;

  _.forEach(_this.opts.variables, function(variable) {
    variable.scope = _this;
    _this.addVariable(variable);
  });

  _.forEach(_this.elements, function (element) {
    element.semanticCheck();
  });

  _this.state.checked = true;
}

function optimize() {
  var _this = this;

  _this.state.optimized = true;
}