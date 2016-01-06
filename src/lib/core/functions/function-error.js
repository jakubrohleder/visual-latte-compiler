var CodeBlock = require('latte/code/code-block');

var _Function = require('./function').constructor;

module.exports = FunctionError;

FunctionError.prototype = Object.create(_Function.prototype);
FunctionError.prototype.constructor = FunctionError;
FunctionError.prototype.semanticCheck = semanticCheck;
FunctionError.prototype.compile = compile;

function FunctionError(rootScope) {
  var _this = this;

  _this.ident = 'error';
  _this.type = rootScope.getType('void');
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

  var puts = 'puts';

  if (state.os === 'darwin') {
    puts = '_' + puts;
  }

  return CodeBlock.create(_this)
    .add('.globl ' + _this.ident)
    .add(_this.ident + ':')
    .add(CodeBlock.create(undefined, 'Error function body', true)
      .add('leaq ERROR_STRING(%rip), %rdi')
      .add('call ' + puts)
      .add('ret')
    );
}


