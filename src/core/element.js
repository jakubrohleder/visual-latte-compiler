var _ = require('lodash');

module.exports = Element;

Element.prototype.semanticCheck = semanticCheck;

function Element(opts) {
  var _this = this;

  _.forEach(opts, function(value, key) {
    _this[key] = value;
  });
}

function semanticCheck() {
  // var _this = this;

}
