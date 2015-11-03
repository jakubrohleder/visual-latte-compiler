/* global require:false*/

var grammar = require('./syntax.json');
var Parser = require('jison').Parser;
var JVM = require('./jvm.js');
var LLVM = require('./llvm.js');

var exports = module.exports = {};

exports.parse = parse;
exports.compileJVM = compileJVM;
exports.compileLLVM = compileLLVM;

function parse(code) {
  var parser = new Parser(grammar);
  parser.yy.data = {
    env: {},
    lines: [],
    locals: 1
  }

  return parser.parse(code);
}

function compileJVM(tree, filename) {
  var compiledCode = JVM.compile(tree, filename);
  // console.log(compiledCode);
  return compiledCode;
}

function compileLLVM(tree, filename) {
  var compiledCode = LLVM.compile(tree, filename);
  // console.log(compiledCode);
  return compiledCode;
}