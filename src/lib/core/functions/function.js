var Element = require('../element');
var Variable = require('../variable');

var CodeBlock = require('latte/code/code-block');
var parseError = require('latte/error').parseError;

var _ = require('lodash');

module.exports = {
  constructor: _Function,
  create: create
};

_Function.prototype = Object.create(Element.prototype);
_Function.prototype.constructor = _Function;
_Function.prototype.semanticCheck = semanticCheck;
_Function.prototype.compile = compile;

_Function.prototype.generateEnter = generateEnter;
_Function.prototype.generateExit = generateExit;

function _Function(opts) {
  var _this = this;

  Element.call(_this, opts);

  _this.main = false;
}

function semanticCheck(state) {
  var _this = this;
  var _void = state.scope.getType('void');
  var variable;

  _this.scope = state.pushScope();
  state.pushFunction(_this);

  _.forEach(_this.args, function(argument, index) {
    variable = Variable.create({
      type: argument.type,
      ident: argument.ident,
      decl: argument,
      stack: index * 8 + 16
    });

    state.scope.addVariable(variable);
  });

  _this.block.semanticCheck(state);

  if (_this.type !== _void && state.scope.return === false) {
    parseError(
      'No return in function \'' + _this.ident + '\'',
      _this.decl.loc[_this.decl.loc.length - 2],
      _this
    );
  }

  state.popScope();
  state.popFunction();
}

function create(opts) {
  return new _Function(opts);
}

function compile(state, extraStack) {
  var _this = this;
  var code;

  extraStack = extraStack || 0;

  state.pushStack();
  state.pushScope(_this.scope);

  state.stack.addArguments(_this.args);

  state.stack.shift(extraStack);

  code = _this.block.compile(state);

  code = CodeBlock.create(_this)
    .add('.globl ' + _this.ident)
    .add(_this.ident + ':')
    .add(CodeBlock.create(undefined, _this.ident + ' function body', true)
      .add(_this.generateEnter(state))
      .add(code)
      .add(_this.generateExit(state))
    );

  state.popScope();
  state.popStack();

  return code;
}

function generateEnter(state) {
  var code = CodeBlock.create()
    .comment('Stack size: ' + state.stack.size)
    .comment('Local: ' + (state.stack.vars))
    .comment('Extra: ' + (state.stack.extra))
    .comment('Calls: ' + (state.stack.max * 8))
    .add('pushq %rbp')
    .add('movq %rsp, %rbp')
  ;

  if (state.stack.size > 0) {
    code.add('subq $' + state.stack.getOffset(16) + ', %rsp');
  }

  return code;
}

function generateExit(state) {
  var _this = this;
  var _void = state.scope.getType('void');
  var code = CodeBlock.create();

  if (_this.type === _void) {
    code.add('nop');
  }

  if (state.stack.size > 0) {
    code.add('addq $' + state.stack.getOffset(16) + ', %rsp');
  }

  return code
    .add('popq %rbp')
    .add('retq');
}
