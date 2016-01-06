var CodeBlock = require('latte/code/code-block');

var _Function = require('./function').constructor;
var Argument = require('../argument');

module.exports = FunctionPrintInt;

FunctionPrintInt.prototype = Object.create(_Function.prototype);
FunctionPrintInt.prototype.constructor = FunctionPrintInt;
FunctionPrintInt.prototype.semanticCheck = semanticCheck;
FunctionPrintInt.prototype.compile = compile;

function FunctionPrintInt(rootScope) {
  var _this = this;
  var arg = Argument.create({
    type: rootScope.getType('int'),
    ident: 'arg'
  });

  _this.ident = 'printInt';
  _this.type = rootScope.getType('void');
  _this.args = [arg];
  _this.parent = rootScope;
  _this.decl = {
    loc: {
      first_line: 1,
      last_line: 1,
      first_column: 1,
      last_column: 1
    }
  };
}

function semanticCheck() {
  // NOTHING
}

function compile(state) {
  var _this = this;

  var printf = 'printf';

  if (state.os === 'darwin') {
    printf = '_' + printf;
  }

  return CodeBlock.create(_this)
    .add('.globl ' + _this.ident)
    .add(_this.ident + ':')
    .add(CodeBlock.create(undefined, 'PrintInt function body', true)
      .add('pushq %rbp')
      .add('movq %rsp, %rbp')

      .add('movq  16(%rbp), %rsi')
      .add('xorq %rax, %rax')
      .add('leaq PRINT_INT_FORMAT(%rip), %rdi')
      .add('call ' + printf)
      .add('xorq %rax, %rax')

      .add('popq %rbp')
      .add('retq')
    );
}

