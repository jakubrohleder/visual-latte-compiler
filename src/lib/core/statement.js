var StatementIf = require('./statements/statement-if');
var StatementIncr = require('./statements/statement-incr');
var StatementDecr = require('./statements/statement-decr');
var StatementReturn = require('./statements/statement-return');
var StatementAssignment = require('./statements/statement-assignment');
var StatementBlock = require('./statements/statement-block');
var StatementDeclarationVariable = require('./statements/statement-declaration-variable');
var StatementDeclarationClass = require('./statements/statement-declaration-class');
var StatementDeclarationFunction = require('./statements/statement-declaration-function');
var StatementWhile = require('./statements/statement-while');

module.exports = {
  If: StatementIf,
  Incr: StatementIncr,
  Decr: StatementDecr,
  Return: StatementReturn,
  Assignment: StatementAssignment,
  Block: StatementBlock,
  DeclarationVariable: StatementDeclarationVariable,
  DeclarationClass: StatementDeclarationClass,
  DeclarationFunction: StatementDeclarationFunction,
  While: StatementWhile
};
