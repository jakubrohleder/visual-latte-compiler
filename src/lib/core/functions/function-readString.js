var CodeBlock = require('latte/code/code-block');
var TypeString = require('latte/core/types/type-string');
var encodeFunctionName = require('latte/utils').encodeFunctionName;

var _Function = require('./function').constr;

FunctionReadString.prototype = Object.create(_Function.prototype);
FunctionReadString.prototype.constructor = FunctionReadString;
FunctionReadString.prototype.semanticCheck = semanticCheck;
FunctionReadString.prototype.compile = compile;

module.exports = new FunctionReadString();

function FunctionReadString() {
  var _this = this;

  _this.name = 'readString';
  _this.type = TypeString;
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
  var getchar = 'getchar';
  var puts = 'puts';
  var malloc = 'malloc';
  var memcpy = 'memcpy';
  var scanf = 'scanf';
  var begin = state.nextLabel();
  var end = state.nextLabel();
  var save = state.nextLabel();

  if (state.os === 'darwin') {
    getchar = '_' + getchar;
    puts = '_' + puts;
    malloc = '_' + malloc;
    memcpy = '_' + memcpy;
    scanf = '_' + scanf;
  }

  return CodeBlock.create(_this)
    .add('.globl ' + _this.ident)
    .add(_this.ident + ':')
    .add(CodeBlock.create(undefined, 'ReadInt function body', true)
      .add('pushq %rbp')
      .add('pushq %r12')
      .add('pushq %r13')
      .add('movq %rsp, %rbp')
      .add('subq  $16, %rsp')

      .add('leaq -24(%rbp), %r12')
      .add('movq $0, %r13')

      .add('xorq %rax, %rax')
      .add('leaq NEW_LINE_FORMAT(%rip), %rdi')
      .add('call ' + scanf)

      .add(begin + ':')
      .add('callq ' + getchar)
      .add('movzbl %al, %ecx')
      .add('cmpl  $10, %ecx')
      .add('je ' + end)

      .add(CodeBlock.create(undefined, 'Every 16th char sub 16 from stack')
        .add('movq %r13, %rax')
        .add('movq $16, %r9')
        .add('cqto')
        .add('idivq %r9')
        .add('cmpq  $0, %rdx')
        .add('jne ' + save)
        .add('subq $16, %rsp')
      )

      .add(save + ':')

      .add('movb  %cl, (%r12)')
      .add('incq  %r13')
      .add('incq  %r12')

      .add('jmp ' + begin)

      .add(end + ':')

      .add(CodeBlock.create(undefined, 'Alloc result string')
        .add('movq %r13, %rdi')
        .add('addq $16, %rdi')
        .add('call ' + malloc)
        .add('movq %rax, %r12')
      )

      .add(CodeBlock.create(undefined, 'Memcpy result string')
        .add('leaq -24(%rbp), %rsi', 'String to src arg')
        .add('movq %r12, %rdi', 'Result string to dest arg')
        .add('movq %r13, %rdx', 'Left string length')

        .add('movq $1, (%rdi)', 'References to 0 pos')
        .add('movq %r13, 8(%rdi)', 'Length to 8 pos')
        .add('addq $16, %rdi', 'Shift references and length')

        .add('call ' + memcpy)
      )

      .add(CodeBlock.create(undefined, 'Clear stack')
        .add('leaq 15(%r13), %rax')
        .add('movq $16, %r9')
        .add('cqto')
        .add('idivq %r9')
        .add('imulq $16, %rax')
        .add('addq %rax, %rsp')
      )

      .add('movq %r12, %rax')

      .add('addq  $16, %rsp')
      .add('popq %r13')
      .add('popq %r12')
      .add('popq %rbp')
      .add('retq')
    );
}
