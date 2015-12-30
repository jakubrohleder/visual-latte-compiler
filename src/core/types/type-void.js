var _ = require('lodash');

var Type = require('./type');

module.exports = TypeVoid;

TypeVoid.prototype = Object.create(Type.prototype);
TypeVoid.prototype.constructor = TypeVoid;
TypeVoid.prototype.checkeValue = _.isUndefined;

function TypeVoid(rootScope) {
  var _this = this;

  Type.call(_this);

  _this.builtin = true;
  _this.name = 'void';
  _this.rootScope = rootScope;
}
