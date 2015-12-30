var _ = require('lodash');
var parseError = require('../error').parseError;

var Element = require('../element');
var Variable = require('../variable');

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

function compile() {
  var _this = this;
  var global = '.globl ' + _this.ident;
  var header = _this.ident + ':';
  var code = [];

  code = code.concat(_this.generateEnter());


  code = code.concat(_this.generateExit());

  return [global, header, code];
}

function generateEnter() {
  var _this = this;

  var enterCode = [
    'pushl %ebp',
    'movl %esp, %ebp'
  ];

  if (_this.args.length > 0) {
    enterCode.push('subl $' + (_this.args.length * 4) + ', %esp');
  }

  return enterCode;
}

function generateExit() {
  var _this = this;
  var exitCode = [
    'movl %ebp, %esp',
    'popl $ebp',
    'ret'
  ];

  if (_this.args.length > 0) {
    exitCode[2] = exitCode[2] + ' ' + (_this.args.length * 4);
  }

  return exitCode;
}
