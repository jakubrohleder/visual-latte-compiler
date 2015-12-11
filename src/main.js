var fs = require('fs');
var Parser = require('jison').Parser;
// var grammar = Hjson.parse(fs.readFileSync(__dirname + '/syntax.json', 'utf8'));
var grammar = fs.readFileSync(__dirname + '/syntax.jison', 'utf8');

var Expression = require('./core/expression.js');
var Statement = require('./core/statement.js');
var Scope = require('./core/scope.js');
var Functions = require('./core/function.js');
var State = require('./core/state.js');
var Variable = require('./core/variable.js');

var exports = module.exports = {};

exports.parse = parse;

function parse(code) {
  var parser = new Parser(grammar);
  var scope = Scope.create();
  var state = State.create({
    mainScope: scope
  });


  state.pushScope(scope);

  parser.yy.state = state;

  parser.yy.Expression = Expression.init(state);
  parser.yy.Statement = Statement.init(state);
  parser.yy.Scope = Scope;
  parser.yy.Function = Functions;
  parser.yy.Variable = Variable;

  return parser.parse(code);
}
