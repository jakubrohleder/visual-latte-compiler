var fs = require('fs');
var path = require('path');
var _ = require('lodash');
var Parser = require('jison').Parser;
var samples = require('./samples.json');
var parseError = require('latte/error').parseError;

var grammar = fs.readFileSync(path.join(__dirname, '/syntax.jison'), 'utf8');

var Expression = require('latte/core/expression');
var Statement = require('latte/core/statement');
var Scope = require('latte/core/scopes/scope');
var _Function = require('latte/core/function');
var Argument = require('latte/core/argument');
var Variable = require('latte/core/variable');
var Block = require('latte/core/block');

var State = require('latte/core/state');

var exports = module.exports = {};

exports.parse = parse;
exports.semanticCheck = semanticCheck;
exports.optimize = optimize;
exports.compile = compile;

exports.samples = samples;

function parse(code) {
  var parser = new Parser(grammar);
  var result;

  parser.yy._ = _;
  parser.yy.Expression = Expression;
  parser.yy.Statement = Statement;
  parser.yy.Scope = Scope;
  parser.yy.Function = _Function;
  parser.yy.Argument = Argument;
  parser.yy.Variable = Variable;
  parser.yy.Block = Block;

  try {
    result = parser.parse(code);
  } catch (error) {
    if (error. hash === undefined) {
      throw error;
    }

    var current = error.hash.token === 'EOF' ? error.hash.token : error.hash.text;
    var expected = '';

    // if (error.hash.loc !== undefined) {
    //   error.hash.loc.first_line ++;
    //   error.hash.loc.last_line ++;
    // }

    if (error.hash.expected !== undefined) {
      expected = error.hash.expected.join(', ');
    }

    parseError(
      'Parse error: expected ' + expected + ' instead of \'' + current + '\'',
      error.hash.loc,
      error
    );
  }

  return result;
}

function semanticCheck(mainBlock) {
  var state = State.create({
    debug: true
  });

  mainBlock.semanticCheck(state);

  if (state.rootScope.functions.main === undefined) {
    parseError(
      'No \'main\' function defined'
    );
  }

  return state;
}


function optimize(state) {
  state.rootScope = state.rootScope.clone();
  return state;
}

function compile(state) {
  return state.rootScope.compile(state);
}
