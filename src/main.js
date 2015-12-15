var fs = require('fs');
var Parser = require('jison').Parser;
var samples = require('./samples.json');

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
  var scope = Scope.create();
  var state = State.create({
    mainScope: scope
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

  tree = parser.parse(code);
  tree.semanticCheck();

  return tree;
}
