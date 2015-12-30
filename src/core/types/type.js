var parseError = require('../error').parseError;
var Element = require('../element');

module.exports = Type;

Type.prototype = Object.create(Element.prototype);
Type.prototype.constructor = Type;
Type.prototype.toString = toString;

Type.prototype.checkValue = checkValue;
Type.prototype.unaryOperationCheck = unaryOperationCheck;
Type.prototype.binaryOperationCheck = binaryOperationCheck;

function Type(opts) {
  var _this = this;

  Element.call(_this, opts);

  _this.operators = {
    binary: {},
    unary: {}
  };

  _this.name = '$VARIABLE+PROTO';
}

function unaryOperationCheck(operator) {
  var _this = this;

  if (_this.operators.unary[operator] === undefined) {
    parseError(
      'Unary operator ' + operator + ' not defined for type ' + _this.name,
      _this.loc,
      _this
    );
  }
}

function binaryOperationCheck(operator, rightType) {
  var _this = this;

  if (_this.operators.unary[operator] === undefined) {
    parseError(
      'Binary operator ' + operator + ' not defined for type ' + _this.name,
      _this.loc,
      _this
    );
  } else if (_this.operators.unary[operator][rightType.name] === undefined) {
    parseError(
      'Binary operator ' + operator + ' not defined for type ' + _this.name + ' and ' + rightType.name,
      _this.loc,
      _this
    );
  }
}

function checkValue() {
  return false;
}

function toString() {
  return 't:' + this.name;
}
