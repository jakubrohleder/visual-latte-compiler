var FunctionDecl = require('./function-decl');
var parseError = require('../error').parseError;

var exports = module.exports = {};

exports.create = create;

FunctionMain.prototype = Object.create(FunctionDecl.prototype);
FunctionMain.prototype.constructor = FunctionMain;
FunctionMain.prototype.semanticCheck = semanticCheck;

function FunctionMain(opts) {
  var _this = this;

  FunctionDecl.call(_this, opts);

  _this.main = true;
}

function create(opts) {
  return new FunctionMain(opts);
}

function semanticCheck() {
  var _this = this;

  if (_this.args.length > 0) {
    parseError(
      'Main function cannot have arguments',
      _this.loc[_this.loc.length - 2],
      _this
    );
  } else if (_this.type !== 'int') {
    parseError(
      'Main must have type \'int\'',
      _this.loc[_this.loc.length - 2],
      _this
    );
  }

  FunctionDecl.prototype.semanticCheck.call(_this);
}
