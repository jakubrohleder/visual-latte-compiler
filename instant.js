var grammar = require('./lib/syntax.json');
var Parser = require('jison').Parser;

var exports = module.exports = {};

exports.parse = parse;

function parse(code) {
  var parser = new Parser(grammar);
  parser.yy.data = {
    env: {},
    program: []
  }

  return parser.parse(code);
}