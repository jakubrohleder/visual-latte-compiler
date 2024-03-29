var CodeBlock = require('latte/code/code-block');
var ExpressionObject = require('latte/core/expressions/expression-object');
var unescape = require('latte/utils').unescape;

var Type = require('./type').constr;
var TypeInt = require('latte/core/types/type-int');

TypeString.prototype = Object.create(Type.prototype);
TypeString.prototype.constructor = TypeString;
TypeString.prototype.semanticCheck = semanticCheck;
TypeString.prototype.semanticCheckValue = semanticCheckValue;
TypeString.prototype.compileValue = compileValue;
TypeString.prototype.compileFree = compileFree;
TypeString.prototype.compile = compile;
TypeString.prototype.defaultValueExpr = defaultValueExpr;
TypeString.prototype.eq = eq;

var typeString = module.exports = new TypeString();

function TypeString() {
  var _this = this;

  Type.call(_this);

  _this.builtin = true;
  _this.name = 'string';
  _this.size = 8;
  _this.pointer = true;

  _this.operators.binary['+'] = {
    compile: compileAdd.bind(_this)
  };
}

function compileAdd(state, left, right) {
  var leftPointer = left;
  var rightPointer = right;
  var resultPointer = state.pushRegister();

  state.popRegister();

  var strlen = 'strlen';
  var malloc = 'malloc';
  var memcpy = 'memcpy';

  if (state.os === 'darwin') {
    strlen = '_' + strlen;
    malloc = '_' + malloc;
    memcpy = '_' + memcpy;
  }

  return CodeBlock.create(this)
    .add('movq ' + rightPointer + ', %rax')
    .add('movq 8(%rax), %rdi')
    .add('movq ' + leftPointer + ', %rax')
    .add('addq 8(%rax), %rdi')
    .add('addq $17, %rdi')
    .add('call ' + malloc, 'Alloc result string')
    .add('movq %rax, ' + resultPointer)

    .add(CodeBlock.create(undefined, 'Memcpy left string')
      .add('movq ' + leftPointer + ', %rsi', 'Left string to src arg')
      .add('movq 8(%rsi), %rdx', 'Left string length')
      .add('addq $16, %rsi', 'Shift length and references')
      .add('movq ' + resultPointer + ', %rdi', 'Result string to dest arg')
      .add('addq $16, %rdi', 'Shift length and references')
      .add('call ' + memcpy)
    )
    .add(CodeBlock.create(undefined, 'Memcpy right string')
      .add('movq ' + rightPointer + ', %rsi', 'Right string to src arg')
      .add('movq 8(%rsi), %rdx', 'Right string length to rdx')
      .add('addq $16, %rsi', 'Shift length and references')
      .add('movq ' + resultPointer + ', %rdi', 'Result + left string length to dest arg')

      .add('movq ' + leftPointer + ', %rax')
      .add('addq 8(%rax), %rdi')
      .add('addq $16, %rdi', 'Shift length and references')

      .add('call ' + memcpy)
    )
    .add('movq ' + rightPointer + ', %rdx')
    .add('movq 8(%rdx), %rax')
    .add('movq ' + leftPointer + ', %rdx')
    .add('addq 8(%rdx), %rax')
    .add('movq ' + resultPointer + ', %rdx')
    .add('movq %rax, 8(%rdx)')
    .add('movq $0, (%rdx)')
    .add('leaq 16(%rdx, %rax), %rax')

    .add('movq $0, (%rax)')
    .add('movq ' + resultPointer + ', %rax')
  ;
}

function compileValue(state, expr) {
  var value = unescape(expr.text);
  var length = value.length;
  var code;
  var malloc = 'malloc';

  if (state.os === 'darwin') {
    malloc = '_' + malloc;
  }

  code = CodeBlock.create(undefined, 'Allocating string')
    .add('movq $' + (length + 17) + ', %rdi')
    .add('call ' + malloc)
  ;

  code.add('movq $0, (%rax)');
  code.add('movq $' + length + ', 8(%rax)');

  for (var i = 0; i < length; i++) {
    code.add('movb $' + value.charCodeAt(i) + ', ' + (i + 16) + '(%rax)');
  }

  code.add('movb $0, ' + (length + 16) + '(%rax)');

  return code;
}

function eq(argument) {
  return argument === this;
}

function defaultValueExpr(loc) {
  return ExpressionObject.create({
    type: typeString,
    text: '""',
    loc: loc
  });
}

function semanticCheck() {
  var _this = this;

  _this.addProperty({
    type: TypeInt,
    name: 'references'
  }, 'references');

  _this.addProperty({
    type: TypeInt,
    name: 'length'
  }, 'length');
}

function semanticCheckValue() {
  // empty
}

function compile() {
  // empty
}

function compileFree(state, address, decq, skip) {
  var end = state.nextLabel();
  var free = 'free';
  var puts = 'puts';
  var printf = 'printf';
  var stringRef = state.pushRegister();

  if (state.os === 'darwin') {
    free = '_' + free;
    printf = '_' + printf;
    puts = '_' + puts;
  }

  return CodeBlock.create(undefined, 'compileFree string')
    .add('movq ' + address + ', %rax')
    .add('movq %rax, ' + stringRef)
    .add('cmpq $0, %rax')
    .add('je ' + end)
    .add('movq ' + stringRef + ', %rax')
    .if(decq, 'decq (%rax)')
    .if(skip, 'jmp ' + end)

    // .add('movq (%r15), %rsi')
    // .add('leaq PRINT_INT_FORMAT(%rip), %rdi')
    // .add('call ' + printf)

    .add('movq ' + stringRef + ', %rax')
    .add('cmpq $0, (%rax)')
    .add('jne ' + end)
    .add('movq ' + stringRef + ', %rdi')
    .add('callq ' + free)

    // .add('leaq FREE_STRING_STRING(%rip), %rdi')
    // .add('call ' + puts)

    .add(end + ':')
    .add('movq ' + stringRef + ', %rax')
    .add('movq %rax, ' + address)
    .exec(state.popRegister())
  ;
}
