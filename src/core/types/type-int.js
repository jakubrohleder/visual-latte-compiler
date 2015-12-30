var _ = require('lodash');

var Type = require('./type');

module.exports = TypeInt;

TypeInt.prototype = Object.create(Type.prototype);
TypeInt.prototype.constructor = TypeInt;
TypeInt.prototype.checkeValue = _.isNumber;

function TypeInt(rootScope) {
  var _this = this;

  Type.call(_this);

  _this.builtin = true;
  _this.name = 'int';
  _this.rootScope = rootScope;

  _this.operators.binary = {
    '+': reduceAdd,
    '-': reduceSub,
    '/': reduceDiv,
    '*': reduceMul
  };

  _this.operators.unary = {
    '-': reduceNeg
  };
}

function reduceAdd() {

}

function reduceSub() {

}

function reduceDiv() {

}

function reduceMul() {

}

function reduceNeg() {

}
