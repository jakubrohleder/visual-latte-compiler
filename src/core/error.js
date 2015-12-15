var exports = module.exports = {};
var _ = require('lodash');

exports.parseError = parseError;

_parseError.prototype = new Error();

function _parseError (msg, hash) {
  this.message = msg;
  this.hash = hash;
}

function parseError(str, loc, object) {
  var hash;
  if (loc === undefined) {
    loc = {
      first_line: 1,
      last_line: 1,
      first_column: 1,
      last_column: 1
    };
  } else if (_.isArray(loc)) {
    loc = loc[loc.length - 1];
  }

  console.log(loc);

  hash = {
    loc: loc,
    object: object,
    parse: true
  };

  throw new _parseError(str, hash);
}
