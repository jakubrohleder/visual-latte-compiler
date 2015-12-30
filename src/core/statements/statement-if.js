var Statement = require('./statement-prototype');
var StatementBlock = require('./statement-block');
var Block = require('../block');
var parseError = require('../error').parseError;
var _ = require('lodash');

module.exports = {
  create: create
};

StatementIf.prototype = Object.create(Statement.prototype);
StatementIf.prototype.constructor = StatementIf;
StatementIf.prototype.semanticCheck = semanticCheck;

function StatementIf(opts) {
  var _this = this;

  Statement.call(_this, opts);
}

function semanticCheck(state) {
  var _this = this;
  var bool = state.scope.getType('boolean');
  _this.expr.semanticCheck(state);

  if (_this.expr.type !== bool) {
    parseError(
      'Wrong type of if condition: \'' + _this.expr.type + '\' instead of \'' + bool + '\'',
      _this.loc,
      _this
    );
  }

  checkPath('right');
  checkPath('wrong');

  state.scope.return = (_this.right.scope && _this.wrong.scope) || state.scope.return;

  function checkPath(pathName) {
    var path = _this[pathName];
    if (_.isArray(path)) {
      parseError(
        'Declaration as only instruction in if',
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
  return new StatementIf(opts);
}
