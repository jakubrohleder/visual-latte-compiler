var _ = require('lodash');

var Type = require('./type');

module.exports = TypeBoolean;

TypeBoolean.prototype = Object.create(Type.prototype);
TypeBoolean.prototype.constructor = TypeBoolean;
TypeBoolean.prototype.checkeValue = _.isBoolean;

function TypeBoolean(rootScope) {
  var _this = this;

  Type.call(_this);

  _this.builtin = true;
  _this.name = 'boolean';
  _this.rootScope = rootScope;

  _this.operators.binary = {
    '||': reduceOr,
    '&&': reduceAnd
  };

  _this.operators.unary = {
    '!': reduceNeg
  };
}

function reduceOr() {

}

function reduceAnd() {

}

function reduceNeg() {

}
