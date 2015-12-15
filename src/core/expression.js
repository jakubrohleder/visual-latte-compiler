var ExpressionComparison = require('./expressions/expression-comparison');
var ExpressionLogical = require('./expressions/expression-logical');
var ExpressionNegation = require('./expressions/expression-negation');
var ExpressionUminus = require('./expressions/expression-uminus');
var ExpressionOperation = require('./expressions/expression-operation');
var ExpressionFuncall = require('./expressions/expression-funcall');
var ExpressionObject = require('./expressions/expression-object');
var ExpressionVariable = require('./expressions/expression-variable');

module.exports = new function() {
  var _this = this

  _this.create = create.bind(_this);
  _this.init = init.bind(_this);
};


function create(type, opts) {
  var expr;
  var _this = this

  opts.scope = _this.state.currentScope;
  opts.function = _this.state.currentFunction;

  switch (type) {
    case 'UMINUS':
      expr = new ExpressionUminus(opts);
      break;

    case 'NEGATION':
      expr = new ExpressionNegation(opts);
      break;

    case 'MULOP':
      expr = new ExpressionOperation(opts);
      break;

    case 'ADDOP':
      expr = new ExpressionOperation(opts);
      break;

    case 'RELOP':
      expr = new ExpressionComparison(opts);
      break;

    case 'LOGAND':
      expr = new ExpressionLogical(opts);
      break;

    case 'LOGOR':
      expr = new ExpressionLogical(opts);
      break;

    case 'FUNCALL':
      expr = new ExpressionFuncall(opts);
      break;

    case 'OBJECT':
      expr = new ExpressionObject(opts);
      break;

    case 'VARIABLE':
      expr = new ExpressionVariable(opts);
      break;

    default:
      console.log('Unmached', opts);
  }
  return expr;
}

function init(state) {
  var _this = this;

  _this.state = state;

  return _this;
}