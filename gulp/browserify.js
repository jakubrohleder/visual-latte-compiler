'use strict';

var path = require('path');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');

var conf = require('./conf');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

gulp.task('browserify', function() {
  var bundle = browserify({
    entries: path.join(conf.paths.lib.src, '/main.js')
  });
  bundle.require('./' + path.join(conf.paths.lib.src, '/main.js'), {expose: 'latte'});

  return bundle.transform('brfs')
    .bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    // .pipe($.uglify())
    .pipe($.rename('instant-bundle.js'))
    .pipe(gulp.dest(conf.paths.web.src))
    .pipe(browserSync.reload({ stream: true }))
    .on('error', function(err) {
      console.log(err);
      this.emit('end');
    }).pipe($.size());
});
