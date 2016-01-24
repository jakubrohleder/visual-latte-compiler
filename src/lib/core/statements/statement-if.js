var Statement = require('./statement');
var StatementBlock = require('./statement-block');
var Block = require('../block');

var parseError = require('latte/error').parseError;
var CodeBlock = require('latte/code/code-block');

module.exports = {
  create: create
};

StatementIf.prototype = Object.create(Statement.prototype);
StatementIf.prototype.constructor = StatementIf;
StatementIf.prototype.semanticCheck = semanticCheck;
StatementIf.prototype.compile = compile;

function StatementIf(opts) {
  var _this = this;

  Statement.call(_this, opts);
}

function create(opts) {
  return new StatementIf(opts);
}

function semanticCheck(state) {
  var _this = this;
  var bool = state.rootScope.getType('boolean');
  _this.cond.semanticCheck(state);

  if (_this.cond.type !== bool) {
    parseError(
      'Wrong type of if condition: \'' + _this.cond.type + '\' instead of \'' + bool + '\'',
      _this.loc,
      _this
    );
  }

  checkPath('right');
  checkPath('wrong');

  state.scope.return = (_this.right.scope.return && _this.wrong.scope.return) || state.scope.return;

  function checkPath(pathName) {
    var path = _this[pathName];

    if (path === undefined) {
      _this[pathName] = StatementBlock.create({
        block: Block.create()
      });
      path = _this[pathName];
    }

    if (path.block === undefined) {
      _this[pathName] = StatementBlock.create({
        block: Block.create([path])
      });
      path = _this[pathName];
    }

    path.semanticCheck(state);
  }
}

function compile(state) {
  var _this = this;
  var right = state.nextLabel();
  var end = state.nextLabel();
  var code = CodeBlock.create(_this)
    .add(_this.cond.compile(state))
    .add('cmpq  $1, %rax')
    .add('je ' + right)
    .add(_this.wrong.compile(state))
    .add('jmp ' + end)
    .add(right + ':', 'right label', -1)
    .add(_this.right.compile(state))
    .add(end + ':', 'end label', -1)
  ;

  // _this.cond.value.free(state);

  return code;
}
