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
