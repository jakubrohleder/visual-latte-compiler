var _ = require('lodash');

var Type = require('./type');

TypeVoid.prototype = Object.create(Type.prototype);
TypeVoid.prototype.constructor = TypeVoid;
TypeVoid.prototype.checkeValue = _.isUndefined;

module.exports = new TypeVoid();

function TypeVoid() {
  var _this = this;

  Type.call(_this);

  _this.builtin = true;
  _this.name = 'void';
}
