module.exports = Element;

Element.prototype.staticCheck = staticCheck;

function Element(opts) {
  var _this = this;

  for (var key in opts) {
    _this[key] = opts[key];
  }
}

function staticCheck() {
  var _this = this;

  _this.checked = true;
}
