var Expression = require('./expression');
var parseError = require('../error').parseError;

module.exports = {
  create: create
};

ExpressionLogical.prototype = Object.create(Expression.prototype);
ExpressionLogical.prototype.constructor = ExpressionLogical;
ExpressionLogical.prototype.semanticCheck = semanticCheck;

function ExpressionLogical(opts) {
  var _this = this;

  Expression.call(_this, opts);
}

function semanticCheck(state) {
  var _this = this;

  _this.left.semanticCheck(state);
  _this.right.semanticCheck(state);

  if (_this.left.type !== _this.right.type) {
    parseError(
      'Can\'t process diferent type: ' + _this.left.type + ' and ' + _this.right.type,
      _this.loc,
      _this
    );
  }

  _this.type = _this.left.type;
}

function create(opts) {
  return new ExpressionLogical(opts);
}
