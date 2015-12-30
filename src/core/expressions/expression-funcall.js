var Expression = require('./expression');
var parseError = require('../error').parseError;
var _ = require('lodash');

module.exports = {
  create: create
};

ExpressionFuncall.prototype = Object.create(Expression.prototype);
ExpressionFuncall.prototype.constructor = ExpressionFuncall;
ExpressionFuncall.prototype.semanticCheck = semanticCheck;

function ExpressionFuncall(opts) {
  var _this = this;

  Expression.call(_this, opts);
}

function semanticCheck(state) {
  var _this = this;
  var fun = state.scope.getFunction(_this.ident);
  var funArg;

  if (fun === undefined) {
    parseError(
      'Undeclared function: ' + _this.ident,
      _this.loc[_this.loc.length - 4],
      _this
    );
  }

  if (fun.args.length !== _this.args.length) {
    parseError(
      'Wrong number of arguments for function ' + _this.ident + ' call: ' + _this.args.length + ' instead of ' + fun.args.length,
      _this.loc[_this.loc.length - 4],
      _this
    );
  }

  _this.type = fun.type;


  _.forEach(_this.args, function(arg, index) {
    funArg = fun.args[index];
    arg.semanticCheck(state);

    if (funArg.type !== arg.type) {
      parseError(
        'Wrong type of ' + (index + 1) + ' argument in \'' + fun.ident + '\' call: \'' + arg.type + '\' instead of \'' + funArg.type + '\'',
        arg.loc,
        _this
      );
    }
  });
}

function create(opts) {
  return new ExpressionFuncall(opts);
}
