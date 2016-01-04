var compiler = require('./compiler');
var fs = require('fs');
var args = process.argv.slice(2);
var path = require('path');
var filename = path.basename(args[0], '.lat');
var filedir = path.dirname(args[0]);
var childProcess = require('child_process');

if (args[0] === undefined) {
  console.error('Need file with instant sourcecode *.lat');
} else {
  fs.readFile(args[0], 'utf8', function(fileReadError, code) {
    try {
      var compiledCode = compiler.compile(
        compiler.optimize(
          compiler.semanticCheck(
            compiler.parse(code)
          )
        )
      ).toString();

      fs.writeFile(filedir + '/' + filename + '.s', compiledCode, function(err) {
        if (err) {
          return console.log(err);
        }
        childProcess.exec('gcc-5 -m32 ' + filedir + '/' + filename + '.s -o ' + filedir + '/' + filename, function(compileError) {
          if (compileError) {
            return console.log(compileError);
          }
        });
      });
    } catch (error) {
      if (error && error.message) {
        console.log(error.message);
      } else {
        throw error;
      }
    }
  });
}
