var Statement = require('./statement-prototype.js');
var parseError = require('../error').parseError;

module.exports = StatementReturn;

StatementReturn.prototype = Object.create(Statement.prototype);
StatementReturn.prototype.constructor = StatementReturn;
StatementReturn.prototype.semanticCheck = semanticCheck;

function StatementReturn(opts) {
  var _this = this;

  Statement.call(_this, opts);
}

function semanticCheck() {
  var _this = this;

  if (_this.expr !== undefined) {
    _this.expr.semanticCheck();
    if (_this.function.type !== _this.expr.type) {
      parseError(
        'Wrong type of return: ' + _this.expr.type + ' instead of ' + _this.function.type,
        _this.loc[_this.loc.length - 2],
        _this
      );
    }
  } else if (_this.function.type !== 'void') {
    parseError(
      'Wrong type of return: void instead of ' + _this.function.type,
      _this.loc,
      _this
    );
  }
}
