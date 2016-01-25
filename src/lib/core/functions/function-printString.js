var CodeBlock = require('latte/code/code-block');
var TypeVoid = require('latte/core/types/type-void');
var TypeString = require('latte/core/types/type-string');
var encodeFunctionName = require('latte/utils').encodeFunctionName;

var _Function = require('./function').constr;
var Argument = require('../argument');

FunctionPrintString.prototype = Object.create(_Function.prototype);
FunctionPrintString.prototype.constructor = FunctionPrintString;
FunctionPrintString.prototype.semanticCheck = semanticCheck;
FunctionPrintString.prototype.compile = compile;

module.exports = new FunctionPrintString();

function FunctionPrintString() {
  var _this = this;
  var arg = Argument.create({
    type: TypeString,
    ident: 'arg'
  });

  _this.name = 'printString';
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

  var puts = 'puts';

  if (state.os === 'darwin') {
    puts = '_' + puts;
  }

  return CodeBlock.create(_this)
    .add('.globl ' + _this.ident)
    .add(_this.ident + ':')
    .add(CodeBlock.create(undefined, 'PrintString function body', true)
      .add('pushq %rbp')
      .add('movq %rsp, %rbp')

      .add('movq 16(%rbp), %rdi')
      .add('addq $16, %rdi')
      .add('xorq %rax, %rax')
      .add('call ' + puts)

      .add('popq %rbp')
      .add('retq')
    );
}

