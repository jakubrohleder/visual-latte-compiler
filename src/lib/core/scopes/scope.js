var parseError = require('latte/error').parseError;
var CodeBlock = require('latte/code/code-block');
var TypeVoid = require('latte/core/types/type-void');

var _ = require('lodash');

module.exports = {
  create: create,
  constr: Scope
};

Scope.prototype.addFunction = addFunction;
Scope.prototype.addVariable = addVariable;
Scope.prototype.addType = addType;
Scope.prototype.addElement = addElement;
Scope.prototype.getVariable = getVariable;
Scope.prototype.getFunction = getFunction;
Scope.prototype.getType = getType;
Scope.prototype.clone = clone;

Scope.prototype.optimize = optimize;
Scope.prototype.compile = compile;

function Scope(opts) {
  var _this = this;

  opts = opts || {};

  _this.root = false;

  _this.functions = {};
  _this.variables = {};
  _this.types = {};
  _this.return = false;

  _this.state = {
    checked: false,
    optimized: false
  };

  _this.parent = opts.parent;
}

function create(opts) {
  return new Scope(opts);
}

function addFunction(fun) {
  var _this = this;
  var loc = fun.decl.loc[fun.decl.loc.length - 2];

  if (_this.functions[fun.name] !== undefined) {
    parseError(
      'Function \'' + fun.name + '\' already defined',
      loc,
      _this
    );
  }

  if (_this.getFunction(fun.name) !== undefined) {
    // console.info('Warning: Redefining parent scope function', fun.name, 'on line', loc.first_line);
  }

  _this.functions[fun.name] = fun;
}

function addVariable(variable) {
  var _this = this;
  var loc = variable.decl.loc[variable.decl.loc.length - 1];

  if (variable.type === TypeVoid) {
    parseError(
      'Variable ' + variable.ident + ' has type void',
      loc,
      _this
    );
  }

  if (_this.variables[variable.ident] !== undefined) {
    parseError(
      'Variable ' + variable.ident + ' already defined',
      loc,
      _this
    );
  }

  if (_this.getVariable(variable.ident) !== undefined) {
    // console.info('Warning: Redefining parent scope variable', variable.ident, 'on line', loc.first_line);
  }

  _this.variables[variable.ident] = variable;
}

function addType(type) {
  var _this = this;
  var loc = type.loc[type.loc.length - 2];

  if (_this.functions[type.name] !== undefined) {
    parseError(
      'Type \'' + type.name + '\' already defined',
      loc,
      _this
    );
  }

  if (_this.getType(type.name) !== undefined) {
    // console.info('Warning: Redefining parent scope type', type.name, 'on line', loc);
  }

  _this.types[type.name] = type;
}

function addElement(element) {
  var _this = this;

  if (element === undefined) {
    return;
  } else if (_.isArray(element)) {
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
    return undefined;
  }

  return _this.parent.getVariable(ident);
}

function getFunction(ident) {
  var _this = this;
  if (_this.functions[ident] !== undefined) {
    return _this.functions[ident];
  } else if (_this.parent === undefined) {
    return undefined;
  }

  return _this.parent.getFunction(ident);
}

function getType(name) {
  var _this = this;
  if (_this.types[name] !== undefined) {
    return _this.types[name];
  } else if (_this.parent === undefined) {
    return undefined;
  }

  return _this.parent.getType(name);
}

function clone() {
  var _this = this;

  return _this;
}

function optimize() {
  var _this = this;

  _this.state.optimized = true;
}

function compile(state) {
  var _this = this;
  var code = CodeBlock.create(_this);

  _.forEach(_this.functions, function(fun) {
    code.add(fun.compile(state));
  });

  return code;
}
