var FunctionDecl = require('./function-decl');
var Argument = require('../variables/argument');

module.exports = FunctionPrintInt;

FunctionPrintInt.prototype = Object.create(FunctionDecl.prototype);
FunctionPrintInt.prototype.constructor = FunctionPrintInt;
FunctionPrintInt.prototype.semanticCheck = semanticCheck;

function FunctionPrintInt() {
  var _this = this;
  var arg = Argument.create({
    type: 'int',
    ident: 'arg'
  });

  _this.ident = 'printInt';
  _this.type = 'void';
  _this.args = [arg];
}

function semanticCheck() {
  // NOTHING
}
