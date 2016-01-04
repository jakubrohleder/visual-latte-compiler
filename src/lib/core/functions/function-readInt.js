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
}

function semanticCheck() {
  // NOTHING
}

function compile() {
  var _this = this;

  return CodeBlock.create(_this)
    .add('.globl ' + _this.ident)
    .add('.align 4, 0x90')
    .add(_this.ident + ':')
    .add(CodeBlock.create(undefined, 'ReadInt function body', true)
      .add('pushl %ebp')
      .add('movl %esp, %ebp')
      .add('leal (%eax), %esi')
      .add('movl .readIntFormat, %edi')
      .add('xorl %eax, %eax')
      .add('calll _scanf')
      .add('popl %ebp')
      .add('retl')
    );
}


