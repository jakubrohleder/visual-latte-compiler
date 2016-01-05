var Statement = require('./statement-prototype');
var StatementBlock = require('./statement-block');
var Block = require('../block');

var parseError = require('latte/error').parseError;
var CodeBlock = require('latte/code/code-block');

var _ = require('lodash');

module.exports = {
  create: create
};

StatementWhile.prototype = Object.create(Statement.prototype);
StatementWhile.prototype.constructor = StatementWhile;
StatementWhile.prototype.semanticCheck = semanticCheck;
StatementWhile.prototype.compile = compile;

function StatementWhile(opts) {
  var _this = this;

  Statement.call(_this, opts);
}

function create(opts) {
  return new StatementWhile(opts);
}

function semanticCheck(state) {
  var _this = this;
  var bool = state.scope.getType('boolean');
  _this.cond.semanticCheck(state);

  if (_this.cond.type !== bool) {
    parseError(
      'Wrong type of if condition: ' + _this.cond.type + ' instead of boolean',
      _this.loc,
      _this
    );
  }

  if (_.isArray(_this.loop)) {
    parseError(
      'Declaration as only instruction in while',
      _this.loop[0].loc,
      _this
    );
  }

  checkPath('loop');

  state.scope.return = _this.loop.scope.return || state.scope.return;

  function checkPath(pathName) {
    var path = _this[pathName];

    if (_.isArray(path)) {
      parseError(
        'Declaration as only instruction in while',
        path[0].loc,
        _this
      );
    }

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
  var start = state.nextLabel();
  var end = state.nextLabel();

  return CodeBlock.create(_this)
    .add(start + ':', 'start label', -1)
    .add(_this.cond.compile(state))
    .add('cmpq  $0, %rax')
    .add('je ' + end)
    .add(_this.loop.compile(state))
    .add('jmp ' + start)
    .add(end + ':', 'end label', -1)
  ;
}
