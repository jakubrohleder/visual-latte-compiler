var exports = module.exports = {};

exports.parseError = parseError;

_parseError.prototype = new Error();

function _parseError (msg, hash) {
  this.message = msg;
  this.hash = hash;
}


function parseError(str, hash) {
  if (hash.recoverable) {
    this.trace(str);
  } else {
    hash.parse = true;
    throw new _parseError(str, hash);
  }
}