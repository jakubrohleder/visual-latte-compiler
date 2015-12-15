var Statement = require('./statement-prototype.js');
var parseError = require('../error').parseError;
var _ = require('lodash');

module.exports = StatementIf;

StatementIf.prototype = Object.create(Statement.prototype);
StatementIf.prototype.constructor = StatementIf;
StatementIf.prototype.semanticCheck = semanticCheck;

function StatementIf(opts) {
  var _this = this;

  Statement.call(_this, opts);
}

function semanticCheck() {
  var _this = this;

  _this.expr.semanticCheck();

  if (_this.expr.type !== 'boolean') {
    parseError('Wrong type of if condition: ' + _this.expr.type + ' instead of boolean', _this);
  }

  // Array only if it's declaration - can be ommited
  if (!_.isArray(_this.right)) {
    _this.right.semanticCheck();
  }

  if (_this.wrong !== undefined) {
    _this.wrong.semanticCheck();
  }
}

