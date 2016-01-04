var _Function = require('./function').constructor;

module.exports = FunctionReadString;

FunctionReadString.prototype = Object.create(_Function.prototype);
FunctionReadString.prototype.constructor = FunctionReadString;
FunctionReadString.prototype.semanticCheck = semanticCheck;
FunctionReadString.prototype.compile = compile;

function FunctionReadString(rootScope) {
  var _this = this;

  _this.ident = 'readString';
  _this.type = rootScope.getType('string');
  _this.args = [];
  _this.parent = rootScope;
}

function semanticCheck() {
  // NOTHING
}

function compile() {
  return [];
}
