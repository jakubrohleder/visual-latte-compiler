var _Function = require('./function').constructor;
var Argument = require('../argument');

module.exports = FunctionPrintInt;

FunctionPrintInt.prototype = Object.create(_Function.prototype);
FunctionPrintInt.prototype.constructor = FunctionPrintInt;
FunctionPrintInt.prototype.semanticCheck = semanticCheck;

function FunctionPrintInt(rootScope) {
  var _this = this;
  var arg = Argument.create({
    type: rootScope.getType('int'),
    ident: 'arg'
  });

  _this.ident = 'printInt';
  _this.type = rootScope.getType('void');
  _this.args = [arg];
  _this.parent = rootScope;
}

function semanticCheck() {
  // NOTHING
}
