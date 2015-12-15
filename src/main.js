var fs = require('fs');
var Parser = require('jison').Parser;
var samples = require('./samples.json');
var parseError = require('./core/error').parseError;

var grammar = fs.readFileSync(__dirname + '/syntax.jison', 'utf8');

var Expression = require('./core/expression.js');
var Statement = require('./core/statement.js');
var Scope = require('./core/scope.js');
var Function = require('./core/function.js');
var State = require('./core/state.js');
var Argument = require('./core/variables/argument.js');
var Variable = require('./core/variables/variable.js');
var VariableReference = require('./core/variables/variable-reference.js');

var exports = module.exports = {};

exports.parse = parse;
exports.samples = samples;

function parse(code) {
  var parser = new Parser(grammar);
  var tree;
  var scope = Scope.create({
    root: true
  });
  var state = State.create({
    rootScope: scope
  });

  Function.create({
    type: 'void',
    ident: 'printInt',
    args: [],
    parent: scope
  });

  Function.create({
    type: 'void',
    ident: 'printString',
    args: [],
    parent: scope
  });

  state.pushScope(scope);

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
