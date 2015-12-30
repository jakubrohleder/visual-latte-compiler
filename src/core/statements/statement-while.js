var Statement = require('./statement-prototype');
var StatementBlock = require('./statement-block');
var Block = require('../block');
var parseError = require('../error').parseError;
var _ = require('lodash');

module.exports = {
  create: create
};

StatementWhile.prototype = Object.create(Statement.prototype);
StatementWhile.prototype.constructor = StatementWhile;
StatementWhile.prototype.semanticCheck = semanticCheck;

function StatementWhile(opts) {
  var _this = this;

  Statement.call(_this, opts);
}

function semanticCheck(state) {
  var _this = this;
  var bool = state.scope.getType('boolean');
  _this.expr.semanticCheck(state);

  if (_this.expr.type !== bool) {
    parseError(
      'Wrong type of if condition: ' + _this.expr.type + ' instead of boolean',
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

function create(opts) {
  return new StatementWhile(opts);
}
