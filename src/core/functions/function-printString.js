var FunctionDecl = require('./function-decl');
var Argument = require('../variables/argument');

module.exports = FunctionPrintString;

FunctionPrintString.prototype = Object.create(FunctionDecl.prototype);
FunctionPrintString.prototype.constructor = FunctionPrintString;
FunctionPrintString.prototype.semanticCheck = semanticCheck;

function FunctionPrintString() {
  var _this = this;
  var arg = Argument.create({
    type: 'string',
    ident: 'arg'
  });

  _this.ident = 'printString';
  _this.type = 'void';
  _this.args = [arg];
}

function semanticCheck() {
  // NOTHING
}
