var Statement = require('./statement');
var StatementBlock = require('./statement-block');
var Block = require('latte/core/block');
var Variable = require('latte/core/variable');

var parseError = require('latte/error').parseError;
var CodeBlock = require('latte/code/code-block');

var _ = require('lodash');

module.exports = {
  create: create
};

StatementFor.prototype = Object.create(Statement.prototype);
StatementFor.prototype.constructor = StatementFor;
StatementFor.prototype.semanticCheck = semanticCheck;
StatementFor.prototype.compile = compile;

function StatementFor(opts) {
  var _this = this;

  Statement.call(_this, opts);
}

function create(opts) {
  return new StatementFor(opts);
}

function semanticCheck(state) {
  var _this = this;

  if (_this.decl === false) {
    _this.current = state.scope.getVariable(_this.ident);

    if (_this.current === undefined) {
      parseError(
        'Undeclared variable in expression: ' + _this.ident,
        _this.loc,
        _this
      );
    }
  } else {
    _this.current = Variable.create({
      type: state.scope.getType(_this.type),
      ident: _this.ident,
      decl: _this
    });
  }

  _this.array = state.scope.getVariable(_this.array);
  _this.type = _this.array.type.elementType;

  if (_this.type === undefined) {
    parseError(
      'Wrong type in for loop: ' + _this.array.type + ' instead of array',
      _this.loc,
      _this
    );
  } else if (_this.type !== _this.current.type) {
    parseError(
      'Wrong index type in \'for\' loop: ' + _this.current.type + ' instead of ' + _this.array.type.elementType,
      _this.loc,
      _this
    );
  }

  checkPath('loop');

  state.scope.return = _this.loop.scope.return || state.scope.return;

  function checkPath(pathName) {
    var path = _this[pathName];

    if (_.isArray(path)) {
      parseError(
        'Declaration as only instruction in for',
        path[0].loc,
        _this
      );
    }

    if (path === undefined) {
      _this[pathName] = StatementBlock.create({
        block: Block.create()
      });
      path = _this[pathName];
    }

    if (path.block === undefined) {
      _this[pathName] = StatementBlock.create({
        block: Block.create([path])
      });
      path = _this[pathName];
    }

    path.semanticCheck(state, _this.current);
  }
}

function compile(state) {
  var _this = this;
  var start = state.nextLabel();
  var end = state.nextLabel();
  var counter = state.pushRegister();

  _this.current.address = '' + -state.stack.addVariable(_this.current) + '(%rbp)';

  var code = CodeBlock.create(_this)
    .add('movq $0, ' + counter)
    .add(start + ':', 'start label', -1)
    .add(CodeBlock.create(undefined, 'For condition')
      .add('movq ' + _this.array.address + ', %rax')
      .add('cmpq ' + counter + ', 8(%rax)')
      .add('jle ' + end)
    )
    .add('movq ' + _this.array.address + ', %rax')
    .add('movq 16(%rax, ' + counter + ', ' + _this.type.size + '), %rax')
    .add('movq %rax, ' + _this.current.address)
    .add(_this.loop.compile(state))
    .add('incq ' + counter)
    .add('jmp ' + start)
    .add(end + ':', 'end label', -1)
  ;

  state.popRegister();

  // _this.cond.value.free(state);

  return code;
}
