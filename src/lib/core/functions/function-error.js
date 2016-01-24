var CodeBlock = require('latte/code/code-block');
var TypeVoid = require('latte/core/types/type-void');

var _Function = require('./function').constructor;

FunctionError.prototype = Object.create(_Function.prototype);
FunctionError.prototype.constructor = FunctionError;
FunctionError.prototype.semanticCheck = semanticCheck;
FunctionError.prototype.compile = compile;

module.exports = new FunctionError();

function FunctionError() {
  var _this = this;

  _this.ident = 'error';
  _this.type = TypeVoid;
  _this.args = [];
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
  var puts = 'puts';
  var exit = 'exit';

  if (state.os === 'darwin') {
    puts = '_' + puts;
    exit = '_' + exit;
  }

  return CodeBlock.create(_this)
    .add('.globl ' + _this.ident)
    .add(_this.ident + ':')
    .add(CodeBlock.create(undefined, 'Error function body', true)
      .add('pushq %rbp')
      .add('movq %rsp, %rbp')

      .add('leaq ERROR_STRING(%rip), %rdi')
      .add('call ' + puts)
      .add('movl $-1, %edi')
      .add('callq _exit')

      .add('popq %rbp')
      .add('ret')
    );
}


