var Element = require('./element');
var parseError = require('latte/error').parseError;
var TypeArray = require('latte/core/types/type-array');

var exports = module.exports = {};

exports.create = create;

Argument.prototype = Object.create(Element.prototype);
Argument.prototype.constructor = Argument;
Argument.prototype.semanticCheck = semanticCheck;

function Argument(opts) {
  var _this = this;

  Element.call(_this, opts);
}

function create(opts) {
  return new Argument(opts);
}

function semanticCheck(state) {
  var _this = this;
  var type = state.scope.getType(_this.type);

  if (type === undefined) {
    parseError(
      'Undeclared variable type ' + _this.type,
      _this.loc,
      _this
    );
  }

  if (_this.array === true) {
    type = TypeArray.create(type);
  }

  _this.type = type;
}
