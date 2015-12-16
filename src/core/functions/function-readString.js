var FunctionDecl = require('./function-decl');

module.exports = FunctionReadString;

FunctionReadString.prototype = Object.create(FunctionDecl.prototype);
FunctionReadString.prototype.constructor = FunctionReadString;
FunctionReadString.prototype.semanticCheck = semanticCheck;

function FunctionReadString(rootScope) {
  var _this = this;

  _this.ident = 'readString';
  _this.type = 'string';
  _this.args = [];
  _this.parent = rootScope;
}

function semanticCheck() {
  // NOTHING
}
