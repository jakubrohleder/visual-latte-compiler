var Expression = require('./expression-prototype.js');
var parseError = require('../error').parseError;
var _ = require('lodash');

module.exports = ExpressionFuncall;

ExpressionFuncall.prototype = Object.create(Expression.prototype);
ExpressionFuncall.prototype.constructor = ExpressionFuncall;
ExpressionFuncall.prototype.semanticCheck = semanticCheck;

function ExpressionFuncall(opts) {
  var _this = this;

  Expression.call(_this, opts);
}

function semanticCheck() {
  var _this = this;
  var fun = _this.scope.getFunction(_this.ident);

  if (fun === false) {
    parseError('Undeclared function: ' + _this.ident, _this);
  } else if (fun.args.length !== _this.args.length) {
    parseError('Wrong number of arguments for function ' + _this.ident + ' call: ' + _this.args.length + ' instead of ' + fun.args.length, _this);
  }

  _this.type = _this.scope.getFunction(_this.ident).type;


  _.forEach(_this.args, function(arg) {
    arg.semanticCheck();
  });
}
