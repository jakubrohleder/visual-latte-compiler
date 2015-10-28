/* global require:false */

var grammar = require('./syntax.json');
var Parser = require('jison').Parser;

var exports = module.exports = {};

exports.parse = parse;

function parse(code) {
  var parser = new Parser(grammar);
  parser.yy.data = {
    env: {},
    program: []
  }

  parser.yy.parseError = function(str, hash) {
    function _parseError (msg, hash) {
      this.message = msg;
      this.hash = hash;
    }
    _parseError.prototype = new Error();

    throw new _parseError(str, hash);
  }

  return parser.parse(code);
}
