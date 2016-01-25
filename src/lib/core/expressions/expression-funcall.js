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
  var funArg;
  var fun;

  _this.ident.semanticCheck(state, true);

  fun = _this.function = _this.ident.function;
  _this.type = fun.type;

  if (fun.args.length !== _this.args.length) {
    parseError(
      'Wrong number of arguments for function ' + _this.ident + ' call: ' + _this.args.length + ' instead of ' + fun.args.length,
      _this.loc[_this.loc.length - 4],
      _this
    );
  }

  _.forEach(_this.args, function(arg, index) {
    funArg = fun.args[index];
    arg.semanticCheck(state);

    if (!funArg.type.eq(arg.type)) {
      parseError(
        'Wrong type of ' + (index + 1) + ' argument in \'' + fun.name + '\' call: \'' + arg.type + '\' instead of \'' + funArg.type + '\'',
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
  var register;
  var code = CodeBlock.create(_this)
    .comment('' + _this.ident + ' calling with ' + _this.args.join(', '));


  state.stack.addFunctionCall(_this);

  _.forEach(_this.args, function(arg, index) {
    register = (index * 8) + '(%rsp)';
    code
      .add(arg.compile(state))
      .add('movq %rax, ' + register)
    ;
  });

  code.add(_this.ident.compile(state));

  if (_this.ident.functionIdent !== undefined) {
    code.add('callq ' + _this.ident.functionIdent);
  } else {
    code
      .add('movq (%rax), %rax')
      .add('callq *%rax');
  }

  code
    .add('movq %rax, ' + state.pushRegister())
    .comment('' + _this.ident + ' call end');

  _.forEach(_this.args, function(arg) {
    code
      // .add(arg.value.free(state))
    ;
  });

  code
    .add('movq ' + state.popRegister() + ', %rax');

  return code;
}

function toString() {
  var _this = this;

  return '' + _this.ident + '(' + _this.args.join(', ') + ')';
}
