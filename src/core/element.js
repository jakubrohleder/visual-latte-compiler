module.exports = Element;

Element.prototype.semanticCheck = semanticCheck;

function Element(opts) {
  var _this = this;

  for (var key in opts) {
    _this[key] = opts[key];
  }
}

function semanticCheck() {
  // var _this = this;

}
