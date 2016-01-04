var parseError = require('latte/error').parseError;

var _Function = require('./function').constructor;

var exports = module.exports = {};

exports.create = create;

FunctionMain.prototype = Object.create(_Function.prototype);
FunctionMain.prototype.constructor = FunctionMain;
FunctionMain.prototype.semanticCheck = semanticCheck;
FunctionMain.prototype.compile = compile;

function FunctionMain(opts) {
  var _this = this;

  _Function.call(_this, opts);

  _this.main = true;
  _this.ident = '_main';
}

function create(opts) {
  return new FunctionMain(opts);
}

function semanticCheck(state) {
  var _this = this;

  _Function.prototype.semanticCheck.call(_this, state);

  if (_this.args.length > 0) {
    parseError(
      'Main function cannot have arguments',
      _this.loc[_this.loc.length - 2],
      _this
    );
  } else if (_this.type !== state.scope.getType('int')) {
    // TODO change to be sure that rootscope int is used
    parseError(
      'Main must have type \'int\'',
      _this.loc[_this.loc.length - 2],
      _this
    );
  }
}

function compile(state) {
  var _this = this;

  return _Function.prototype.compile.call(_this, state, 80);
}
