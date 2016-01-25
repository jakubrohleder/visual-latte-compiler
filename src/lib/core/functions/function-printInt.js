var CodeBlock = require('latte/code/code-block');
var TypeVoid = require('latte/core/types/type-void');
var TypeInt = require('latte/core/types/type-int');
var encodeFunctionName = require('latte/utils').encodeFunctionName;

var _Function = require('./function').constr;
var Argument = require('../argument');

FunctionPrintInt.prototype = Object.create(_Function.prototype);
FunctionPrintInt.prototype.constructor = FunctionPrintInt;
FunctionPrintInt.prototype.semanticCheck = semanticCheck;
FunctionPrintInt.prototype.compile = compile;

module.exports = new FunctionPrintInt();

function FunctionPrintInt() {
  var _this = this;
  var arg = Argument.create({
    type: TypeInt,
    ident: 'arg'
  });

  _this.name = 'printInt';
  _this.type = TypeVoid;
  _this.args = [arg];
  _this.ident = encodeFunctionName(_this, undefined, true);
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

