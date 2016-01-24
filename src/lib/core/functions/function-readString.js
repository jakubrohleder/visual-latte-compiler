var CodeBlock = require('latte/code/code-block');
var TypeString = require('latte/core/types/type-string');

var _Function = require('./function').constructor;

FunctionReadString.prototype = Object.create(_Function.prototype);
FunctionReadString.prototype.constructor = FunctionReadString;
FunctionReadString.prototype.semanticCheck = semanticCheck;
FunctionReadString.prototype.compile = compile;

module.exports = new FunctionReadString();

function FunctionReadString() {
  var _this = this;

  _this.ident = 'readString';
  _this.type = TypeString;
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
      .add('pushq %rbx')
      .add('pushq %r15')
      .add('movq %rsp, %rbp')
      .add('subq  $16, %rsp')

      .add('leaq -24(%rbp), %rbx')
      .add('movq $0, %r15')

      .add('xorq %rax, %rax')
      .add('leaq NEW_LINE_FORMAT(%rip), %rdi')
      .add('call ' + scanf)

      .add(begin + ':')
      .add('callq ' + getchar)
      .add('movzbl %al, %ecx')
      .add('cmpl  $10, %ecx')
      .add('je ' + end)

      .add(CodeBlock.create(undefined, 'Every 16th char sub 16 from stack')
        .add('movq %r15, %rax')
        .add('movq $16, %r9')
        .add('cqto')
        .add('idivq %r9')
        .add('cmpq  $0, %rdx')
        .add('jne ' + save)
        .add('subq $16, %rsp')
      )

      .add(save + ':')

      .add('movb  %cl, (%rbx)')
      .add('incq  %r15')
      .add('incq  %rbx')

      .add('jmp ' + begin)

      .add(end + ':')

      .add(CodeBlock.create(undefined, 'Alloc result string')
        .add('movq %r15, %rdi')
        .add('call ' + malloc)
        .add('movq %rax, %rbx')
      )

      .add(CodeBlock.create(undefined, 'Memcpy result string')
        .add('leaq  -24(%rbp), %rsi', 'String to src arg')
        .add('movq %rbx, %rdi', 'Result string to dest arg')
        .add('movq %r15, %rdx', 'Left string length')
        .add('call ' + memcpy)
      )

      .add(CodeBlock.create(undefined, 'Clear stack')
        .add('leaq 15(%r15), %rax')
        .add('movq $16, %r9')
        .add('cqto')
        .add('idivq %r9')
        .add('imulq $16, %rax')
        .add('addq %rax, %rsp')
      )

      .add('movq %rbx, %rax')

      .add('addq  $16, %rsp')
      .add('popq %r15')
      .add('popq %rbx')
      .add('popq %rbp')
      .add('retq')
    );
}
