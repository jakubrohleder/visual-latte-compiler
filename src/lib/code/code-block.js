var CodeLine = require('./code-line');
var CodeComment = require('./code-comment');

var _ = require('lodash');

module.exports = {
  create: create
};

CodeBlock.prototype = Object.create(Array.prototype);
CodeBlock.prototype.add = add;
CodeBlock.prototype.comment = comment;
CodeBlock.prototype.concat = concat;
CodeBlock.prototype.toString = toString;

function CodeBlock(element, commentText, indent) {
  var _this = this;

  Array.call(_this);

  _this.commentText = commentText;
  _this.element = element;
  _this.indent = indent || false;
}

function create(element, commentText, indent) {
  return new CodeBlock(element, commentText, indent);
}

function add(lineOrBlock, commentText, shift) {
  var _this = this;
  var line;

  if (_.isString(lineOrBlock)) {
    line = CodeLine.create(lineOrBlock, commentText, shift);
  } else {
    line = lineOrBlock;
  }

  _this.push(line);

  return _this;
}

function comment(commentText) {
  var _this = this;

  _this.push(CodeComment.create(commentText));

  return _this;
}

function concat(lines) {
  var _this = this;
  var offset;

  if (_.isArray(lines)) {
    lines = _.flatten(lines);
    offset = _this.length;
    _this.length = offset + lines.length;

    for (var i = 0; i < lines.length; i++) {
      _this[offset + i] = lines[i];
    }
  }

  return _this;
}

function toString(debug, indentSize, indentLevel) {
  var _this = this;
  var output = '';

  debug = debug === undefined ? false : debug;
  indentSize = indentSize === undefined ? 2 : indentSize;
  indentLevel = indentLevel === undefined ? 0 : indentLevel;

  if (_this.indent === true) {
    indentLevel++;
  }

  if (debug === true && _this.commentText !== undefined) {
    output += '#---' + _this.commentText + ' start\n';
  }

  _.forEach(_this, function(element) {
    output += element.toString(debug, indentSize, indentLevel);
  });

  if (debug === true && _this.commentText !== undefined) {
    output += '#---' + _this.commentText + ' end\n';
  }

  if (_this.indent === true) {
    output += '\n';
  }

  return output;
}
