var fs = require('fs');
var path = require('path');
var Parser = require('jison').Parser;
var samples = require('./samples.json');
var parseError = require('./core/error').parseError;

var grammar = fs.readFileSync(path.join(__dirname, '/syntax.jison'), 'utf8');

var Expression = require('./core/expression');
var Statement = require('./core/statement');
var Scope = require('./core/scopes/scope');
var Function = require('./core/function');
var State = require('./core/state');
var Argument = require('./core/variables/argument');
var Variable = require('./core/variables/variable-prototype');
var VariableReference = require('./core/variables/variable-reference');

var exports = module.exports = {};

exports.parse = parse;
exports.samples = samples;

function parse(code) {
  var parser = new Parser(grammar);
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
    parser.parse(code);
  } catch (error) {
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

  return parser.yy.state.rootScope;
}
