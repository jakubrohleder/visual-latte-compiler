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

function compileJVM(tree, className) {
  var compiledCode = JVM.compile(tree, className);
  return compiledCode;
}

function compileLLVM(tree, className) {
  var compiledCode = LLVM.compile(tree, className);
  return compiledCode;
}