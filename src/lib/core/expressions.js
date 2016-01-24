var ExpressionComparison = require('./expressions/expression-comparison');
var ExpressionLogical = require('./expressions/expression-logical');
var ExpressionNegation = require('./expressions/expression-negation');
var ExpressionUminus = require('./expressions/expression-uminus');
var ExpressionOperation = require('./expressions/expression-operation');
var ExpressionFuncall = require('./expressions/expression-funcall');
var ExpressionObject = require('./expressions/expression-object');
var ExpressionVariable = require('./expressions/expression-variable');
var ExpressionParenthesis = require('./expressions/expression-parenthesis');
var ExpressionNull = require('./expressions/expression-null');

module.exports = {
  Comparison: ExpressionComparison,
  Logical: ExpressionLogical,
  Negation: ExpressionNegation,
  Uminus: ExpressionUminus,
  Operation: ExpressionOperation,
  Funcall: ExpressionFuncall,
  Object: ExpressionObject,
  Variable: ExpressionVariable,
  Null: ExpressionNull,
  Parenthesis: ExpressionParenthesis
};
