var fs = require('fs');
var Parser = require('jison').Parser;
var samples = require('./samples.json');
var parseError = require('./core/error').parseError;

var grammar = fs.readFileSync(__dirname + '/syntax.jison', 'utf8');

var Expression = require('./core/expression');
var Statement = require('./core/statement');
var Scope = require('./core/scopes/scope');
var Function = require('./core/function');
var State = require('./core/state');
var Argument = require('./core/variables/argument');
var Variable = require('./core/variables/variable');
var VariableReference = require('./core/variables/variable-reference');

var exports = module.exports = {};

exports.parse = parse;
exports.samples = samples;

function parse(code) {
  var parser = new Parser(grammar);
  var tree;
  var state = State.create();

  parser.yy.state = state;

  parser.yy.Expression = Expression.init(state);
  parser.yy.Statement = Statement.init(state);
  parser.yy.Scope = Scope;
  parser.yy.Function = Function;
  parser.yy.Argument = Argument;
  parser.yy.Variable = Variable;
  parser.yy.VariableReference = VariableReference;

  try {
    tree = parser.parse(code);
  } catch (error) {
    console.log(error);
    error.hash.loc.first_line ++;
    error.hash.loc.last_line ++;
    parseError(
      'Parse error: expected ' + error.hash.expected.join(' ') + ' instead of ' + error.hash.token,
      error.hash.loc,
      error
    );
  }

  // tree.semanticCheck();

  return tree;
}
