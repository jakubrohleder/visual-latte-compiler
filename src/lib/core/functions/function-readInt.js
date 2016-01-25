var CodeBlock = require('latte/code/code-block');
var TypeInt = require('latte/core/types/type-int');
var encodeFunctionName = require('latte/utils').encodeFunctionName;

var _Function = require('./function').constr;

FunctionReadInt.prototype = Object.create(_Function.prototype);
FunctionReadInt.prototype.constructor = FunctionReadInt;
FunctionReadInt.prototype.semanticCheck = semanticCheck;
FunctionReadInt.prototype.compile = compile;

module.exports = new FunctionReadInt();

function FunctionReadInt() {
  var _this = this;

  _this.name = 'readInt';
  _this.type = TypeInt;
  _this.args = [];
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
  var scanf = 'scanf';

  if (state.os === 'darwin') {
    scanf = '_' + scanf;
  }

  return CodeBlock.create(_this)
    .add('.globl ' + _this.ident)
    .add(_this.ident + ':')
    .add(CodeBlock.create(undefined, 'ReadInt function body', true)
      .add('pushq %rbp')
      .add('movq %rsp, %rbp')
      .add('subq  $16, %rsp')

      .add('movq %rsp, %rsi')
      .add('xorq %rax, %rax')
      .add('leaq READ_INT_FORMAT(%rip), %rdi')
      .add('call ' + scanf)
      .add('movq (%rsp), %rax')

      .add('addq  $16, %rsp')
      .add('popq %rbp')
      .add('retq')
    );
}


