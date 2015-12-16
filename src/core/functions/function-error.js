var FunctionDecl = require('./function-decl');

module.exports = FunctionError;

FunctionError.prototype = Object.create(FunctionDecl.prototype);
FunctionError.prototype.constructor = FunctionError;
FunctionError.prototype.semanticCheck = semanticCheck;

function FunctionError(rootScope) {
  var _this = this;

  _this.ident = 'error';
  _this.type = 'void';
  _this.args = [];
  _this.parent = rootScope;
}

function semanticCheck() {
  // NOTHING
}
