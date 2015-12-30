var _Function = require('./function').constructor;

module.exports = FunctionError;

FunctionError.prototype = Object.create(_Function.prototype);
FunctionError.prototype.constructor = FunctionError;
FunctionError.prototype.semanticCheck = semanticCheck;

function FunctionError(rootScope) {
  var _this = this;

  _this.ident = 'error';
  _this.type = rootScope.getType('void');
  _this.args = [];
  _this.parent = rootScope;
}

function semanticCheck() {
  // NOTHING
}
