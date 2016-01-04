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

  _this.scope = state.pushScope();
  state.pushFunction(_this);

  _.forEach(_this.args, function(argument) {
    _this.variable = Variable.create({
      type: argument.type,
      ident: argument.ident,
      decl: argument
    });

    state.scope.addVariable(_this.variable);
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

function compile(state) {
  var _this = this;
  var code;

  state.pushStack();
  state.pushScope(_this.scope);

  state.stack.addArguments(_this.args);

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
  var _this = this;
  var code = CodeBlock.create()
    .comment('Stack size: ' + state.stack.size)
    .comment('Arguments: ' + (_this.args.length * 4))
    .comment('Local: ' + (state.stack.current - _this.args.length * 4))
    .comment('Calls: ' + (state.stack.max * 4))
    .add('pushl %ebp')
    .add('movl %esp, %ebp')
  ;

  if (state.stack.size > 0) {
    code.add('subl $' + state.stack.size + ', %esp');
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
    code.add('movl %ebp, %esp');
  }

  return code
    .add('popl $ebp')
    .add('retl');
}
