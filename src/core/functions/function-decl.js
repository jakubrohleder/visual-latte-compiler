var Element = require('../element');
var _ = require('lodash');

module.exports = FunctionDecl;

FunctionDecl.prototype = Object.create(Element.prototype);
FunctionDecl.prototype.constructor = FunctionDecl;
FunctionDecl.prototype.semanticCheck = semanticCheck;

function FunctionDecl(opts) {
  var _this = this;

  Element.call(_this, opts);

  _this.main = false;
}

function semanticCheck() {
  var _this = this;

  _.forEach(_this.args, function(arg) {
    arg.semanticCheck();
  });

  _this.scope.semanticCheck();
}
