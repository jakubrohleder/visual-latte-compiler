var repeatString = require('latte/utils').repeatString;

module.exports = {
  create: create
};

CodeComment.prototype.toString = toString;

function CodeComment(text) {
  var _this = this;

  _this.text = text;
}

function create(text) {
  return new CodeComment(text);
}

function toString(debug, indentSize, indentLevel) {
  var _this = this;

  if (debug === false) {
    return '';
  }

  return repeatString(' ', (indentSize + 1) * indentLevel) + '#' + _this.text + '\n';
}
