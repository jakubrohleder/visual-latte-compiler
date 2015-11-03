var exports = module.exports = {};

exports.compile = compile;

function compile(tree, filename) {
  return 'LLVM ' + filename;
}
