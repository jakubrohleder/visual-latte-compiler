'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

gulp.task('browsify', function () {
  gulp.src(path.join(conf.paths.lib.src, '/main.js'), { read: false })
    .pipe($.browserify())
    .on('prebundle', function(bundle) {
      bundle.require('./main.js', {expose: 'instant'});
    })
    .pipe($.rename('instant-bundle.js'))
    .pipe(gulp.dest(conf.paths.web.src))
    .pipe(browserSync.reload({ stream: true }));
});
