var fs = require('fs');
var Parser = require('jison').Parser;
var Hjson = require('hjson');
var grammar = Hjson.parse(fs.readFileSync(__dirname + '/syntax.json', 'utf8'));

var expressions = require('./core/expressions.js');
var statements = require('./core/statements.js');
var blocks = require('./core/blocks.js');
var functions = require('./core/functions.js');

var exports = module.exports = {};

exports.parse = parse;

function parse(code) {
  var parser = new Parser(grammar);
  parser.yy.data = {
    env: {},
    lines: []
  }

  parser.yy.expressions = expressions;
  parser.yy.statements = statements;
  parser.yy.blocks = blocks;
  parser.yy.functions = functions;

  return parser.parse(code);
}
