var StatementIf = require('./statements/statement-if');
var StatementIncr = require('./statements/statement-incr');
var StatementDecr = require('./statements/statement-decr');
var StatementReturn = require('./statements/statement-return');
var StatementAssignment = require('./statements/statement-assignment');
var StatementDeclaration = require('./statements/statement-declaration');
var StatementWhile = require('./statements/statement-while');

module.exports = new function() {
  var _this = this

  _this.create = create.bind(_this);
  _this.init = init.bind(_this);
};

function create(type, opts) {
  var stmt;
  var _this = this

  opts = opts || {};

  opts.scope = _this.state.currentScope;

  switch (type) {
    case 'VARIABLE_ASSIGNMENT':
      stmt = new StatementAssignment(opts);
      break;

    case 'VARIABLE_INCR':
      stmt = new StatementIncr(opts);
      break;

    case 'VARIABLE_DECR':
      stmt = new StatementDecr(opts);
      break;

    case 'RETURN':
      stmt = new StatementReturn(opts);
      break;

    case 'IF':
      stmt = new StatementIf(opts);
      break;

    case 'WHILE':
      stmt = new StatementWhile(opts);
      break;

    case 'VARIABLE_DECLARATION':
      stmt = new StatementDeclaration(opts);
      break;
  }

  return stmt;
}

function init(state) {
  var _this = this;

  _this.state = state;

  return _this;
}