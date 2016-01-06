var CodeBlock = require('latte/code/code-block');

var _Function = require('./function').constructor;

module.exports = FunctionReadInt;

FunctionReadInt.prototype = Object.create(_Function.prototype);
FunctionReadInt.prototype.constructor = FunctionReadInt;
FunctionReadInt.prototype.semanticCheck = semanticCheck;
FunctionReadInt.prototype.compile = compile;

function FunctionReadInt(rootScope) {
  var _this = this;

  _this.ident = 'readInt';
  _this.type = rootScope.getType('int');
  _this.args = [];
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


