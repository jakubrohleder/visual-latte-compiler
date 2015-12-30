var _Function = require('./function').constructor;

module.exports = FunctionReadInt;

FunctionReadInt.prototype = Object.create(_Function.prototype);
FunctionReadInt.prototype.constructor = FunctionReadInt;
FunctionReadInt.prototype.semanticCheck = semanticCheck;

function FunctionReadInt(rootScope) {
  var _this = this;

  _this.ident = 'readInt';
  _this.type = rootScope.getType('int');
  _this.args = [];
  _this.parent = rootScope;
}

function semanticCheck() {
  // NOTHING
}
