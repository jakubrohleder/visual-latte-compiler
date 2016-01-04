var parseError = require('latte/error').parseError;
var CodeBlock = require('latte/code/code-block');

var _ = require('lodash');

var exports = module.exports = {};

exports.create = create;
exports.Scope = Scope;

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

  if (_this.functions[fun.ident] !== undefined) {
    parseError(
      'Function \'' + fun.ident + '\' already defined',
      fun.decl.loc[fun.decl.loc.length - 2],
      _this
    );
  }

  if (_this.getFunction(fun.ident) !== undefined) {
    console.warn('Warning: Redefining function', fun.ident);
  }

  _this.functions[fun.ident] = fun;
}

function addVariable(variable) {
  var _this = this;
  var defined = _this.getVariable(variable.ident);

  if (_this.variables[variable.ident] !== undefined) {
    parseError(
      'Variable ' + variable.ident + ' already defined',
      variable.decl.loc,
      _this
    );
  }

  if (defined !== undefined) {
    console.warn('Warning: Redefining variable', variable.ident, 'from', defined, 'to', variable);
  }

  _this.variables[variable.ident] = variable;
}

function addType(type) {
  var _this = this;

  if (_this.functions[type.name] !== undefined) {
    parseError(
      'Type \'' + type.name + '\' already defined',
      type.loc[type.loc.length - 2],
      _this
    );
  }

  if (_this.getType(type.name) !== undefined) {
    console.log('Redefining type', type.name);
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
