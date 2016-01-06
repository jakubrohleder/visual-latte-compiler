var CodeBlock = require('latte/code/code-block');

var _Function = require('./function').constructor;
var Argument = require('../argument');

module.exports = FunctionPrintString;

FunctionPrintString.prototype = Object.create(_Function.prototype);
FunctionPrintString.prototype.constructor = FunctionPrintString;
FunctionPrintString.prototype.semanticCheck = semanticCheck;
FunctionPrintString.prototype.compile = compile;

function FunctionPrintString(rootScope) {
  var _this = this;
  var arg = Argument.create({
    type: rootScope.getType('string'),
    ident: 'arg'
  });

  _this.ident = 'printString';
  _this.type = rootScope.getType('void');
  _this.args = [arg];
  _this.parent = rootScope;
}

function semanticCheck() {
  // NOTHING
}

function compile(state) {
  var _this = this;

  var puts = 'puts';

  if (state.os === 'osx') {
    puts = '_' + puts;
  }

  return CodeBlock.create(_this)
    .add('.globl ' + _this.ident)
    .add(_this.ident + ':')
    .add(CodeBlock.create(undefined, 'PrintString function body', true)
      .add('pushq %rbp')
      .add('movq %rsp, %rbp')

      .add('movq  16(%rbp), %rdi')
      .add('xorq %rax, %rax')
      .add('call ' + puts)

      .add('popq %rbp')
      .add('retq')
    );
}

