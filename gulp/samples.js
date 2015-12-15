'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var $ = require('gulp-load-plugins')();

gulp.task('samples', function () {
  return gulp.src(path.join(conf.paths.lib.samples, '/**/*'))
      .pipe($.fileContentsToJson('samples.json'))
      .pipe(gulp.dest(conf.paths.lib.src));
});
