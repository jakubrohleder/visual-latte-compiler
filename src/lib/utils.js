var exports = module.exports = {};

exports.getFunctionName = function(fun) {
  var funcNameRegex = /function (.{1,})\(/;
  var results = (funcNameRegex).exec((fun).constructor.toString());
  return (results && results.length > 1) ? results[1] : '';
};

exports.repeatString = function(string, times) {
  var output = '';
  for (;;) {
    if (times & 1) {
      output += string;
    }

    times >>= 1;

    if (times) {
      string += string;
    } else {
      break;
    }
  }

  return output;
};

exports.nextMul = function(argument, base) {
  return Math.ceil((argument - 1) / base) * base;
};

exports.unescape = function(string) {
  return string
    .replace(/^\"/, '')
    .replace(/\"$/, '')
    .replace(/([^\\])\\n/g, '$1\n')
    .replace(/([^\\])\\t/g, '$1\t')
    .replace(/\\\"/g, '\"')
    .replace(/\\\'/g, '\'')
    .replace(/\\\\/g, '\\');
};
