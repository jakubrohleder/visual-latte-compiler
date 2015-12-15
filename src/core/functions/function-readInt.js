var FunctionDecl = require('./function-decl');

module.exports = FunctionReadInt;

FunctionReadInt.prototype = Object.create(FunctionDecl.prototype);
FunctionReadInt.prototype.constructor = FunctionReadInt;
FunctionReadInt.prototype.semanticCheck = semanticCheck;

function FunctionReadInt() {
  var _this = this;

  _this.ident = 'readInt';
  _this.type = 'int';
  _this.args = [];
}

function semanticCheck() {
  // NOTHING
}
