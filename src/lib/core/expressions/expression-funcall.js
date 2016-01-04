var CodeBlock = require('latte/code/code-block');
var parseError = require('latte/error').parseError;

var Expression = require('./expression');

var _ = require('lodash');

module.exports = {
  create: create
};

ExpressionFuncall.prototype = Object.create(Expression.prototype);
ExpressionFuncall.prototype.constructor = ExpressionFuncall;
ExpressionFuncall.prototype.semanticCheck = semanticCheck;
ExpressionFuncall.prototype.compile = compile;
ExpressionFuncall.prototype.toString = toString;

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

  _this.function = fun;

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

function compile(state) {
  var _this = this;
  var code = CodeBlock.create(_this)
    .comment('' + _this.ident + ' calling with ' + _this.args.join(', '));

  state.stack.addFunctionCall(_this);

  _.forEach(_this.args, function(arg, index) {
    code
      .add(arg.compile(state))
      .add('movl %eax, ' + (index * 4) + '(%esp)')
    ;
  });

  code
    .add('calll ' + _this.function.ident)
    .comment('' + _this.ident + ' call end');

  return code;
}

function toString() {
  var _this = this;

  return '' + _this.ident + '(' + _this.args.join(', ') + ')';
}
