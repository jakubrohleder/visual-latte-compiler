var repeatString = require('latte/utils').repeatString;

module.exports = {
  create: create
};

CodeLine.prototype.toString = toString;

function CodeLine(line, comment, shift) {
  var _this = this;

  _this.line = line;
  _this.comment = comment;
  _this.shift = shift === undefined ? 0 : shift;
}

function create(line, comment, shift) {
  return new CodeLine(line, comment, shift);
}

function toString(debug, indentSize, indentLevel) {
  var _this = this;
  var line = repeatString(' ', indentSize * (indentLevel + _this.shift)) + _this.line;

  if (debug === true) {
    line += ';' + _this.comment;
  }

  return line + '\n';
}

