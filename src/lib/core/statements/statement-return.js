var Statement = require('./statement');

var parseError = require('latte/error').parseError;
var CodeBlock = require('latte/code/code-block');

module.exports = {
  create: create
};

StatementReturn.prototype = Object.create(Statement.prototype);
StatementReturn.prototype.constructor = StatementReturn;
StatementReturn.prototype.semanticCheck = semanticCheck;
StatementReturn.prototype.compile = compile;

function StatementReturn(opts) {
  var _this = this;

  Statement.call(_this, opts);
}

function create(opts) {
  return new StatementReturn(opts);
}

function semanticCheck(state) {
  var _this = this;
  var _void = state.rootScope.getType('void');
  var type = state.function.type;

  if (_this.expr !== undefined) {
    _this.expr.semanticCheck(state);

    if (type !== _this.expr.type) {
      parseError(
        'Wrong type of return: \'' + _this.expr.type + '\' instead of \'' + type + '\'',
        _this.loc[_this.loc.length - 2],
        _this
      );
    } else if (type === _void) {
      parseError(
        'Void function can\'t return any value',
        _this.loc[_this.loc.length - 2],
        _this
      );
    }
  } else if (type !== _void) {
    parseError(
      'Wrong type of return: \'' + _void + '\' instead of \'' + type + '\'',
      _this.loc,
      _this
    );
  }

  state.scope.return = true;
}

function compile(state) {
  var _this = this;
  var code = CodeBlock.create(_this);

  if (_this.expr !== undefined) {
    code
      .add(_this.expr.compile(state))
    ;
  }

  code
    .add('jmp ' + state.function.exitLabel)
    .comment('return ' + _this.expr);

  return code;
}

