var compiler = require('./compiler');
var fs = require('fs');
var args = process.argv.slice(2);
var path = require('path');
var filepath = process.cwd() + '/' + args[0];
var filename = path.basename(filepath, '.lat');
var filedir = path.dirname(filepath);
var childProcess = require('child_process');

if (filepath === undefined) {
  console.error('Need file with instant sourcecode *.lat');
} else {
  fs.readFile(filepath, 'utf8', function(fileReadError, code) {
    try {
      var compiledCode = compiler.compile(
        compiler.optimize(
          compiler.semanticCheck(
            compiler.parse(code), 'osx'
          )
        )
      ).toString(true);

      fs.writeFile(path.join(filedir, filename + '.s'), compiledCode, function(err) {
        if (err) {
          return console.log(err);
        }

        childProcess.exec('gcc-5 "' + path.join(filedir, filename + '.s') + '" -o "' + path.join(filedir, filename) + '"', function(compileError) {
          if (compileError) {
            console.error('ERROR');
            console.error('error compiling file');
            console.error(compileError);
          } else {
            console.error('OK');
          }
        });
      });
    } catch (error) {
      if (error && error.message) {
        console.error('ERROR');
        console.error('error reading file');
        console.error(error.message);
      } else {
        throw error;
      }
    }
  });
}
