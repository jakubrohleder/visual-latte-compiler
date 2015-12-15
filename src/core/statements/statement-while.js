var Statement = require('./statement-prototype.js');
var parseError = require('../error').parseError;
var _ = require('lodash');

module.exports = StatementWhile;

StatementWhile.prototype = Object.create(Statement.prototype);
StatementWhile.prototype.constructor = StatementWhile;
StatementWhile.prototype.semanticCheck = semanticCheck;

function StatementWhile(opts) {
  var _this = this;

  Statement.call(_this, opts);
}

function semanticCheck() {
  var _this = this;

  _this.expr.semanticCheck();

  if (_this.expr.type !== 'boolean') {
    parseError(
      'Wrong type of if condition: ' + _this.expr.type + ' instead of boolean',
      _this.loc,
      _this
    );
  }

  if (!_.isArray(_this.stmt)) {
    _this.stmt.semanticCheck();
  } else {
    parseError('Declaration as only instruction in while', {loc: _this.stmt[0].loc});
  }
}
