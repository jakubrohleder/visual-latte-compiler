var _ = require('lodash');

var Type = require('./type');

module.exports = TypeString;

TypeString.prototype = Object.create(Type.prototype);
TypeString.prototype.constructor = TypeString;
TypeString.prototype.checkeValue = _.isString;

function TypeString(rootScope) {
  var _this = this;

  Type.call(_this);

  _this.builtin = true;
  _this.name = 'string';
  _this.rootScope = rootScope;

  _this.operators.binary = {
    '+': reduceCon
  };
}

function reduceCon() {

}
