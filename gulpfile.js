var _ = require('lodash');
var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var transform = require('vinyl-transform');
var buffer = require('vinyl-buffer');
var shimify = require('browserify-shim');
var source = require('vinyl-source-stream');
var plumber = require('gulp-plumber');
var uglify = require('gulp-uglify');
var size = require('gulp-size');
var sourcemaps = require('gulp-sourcemaps');
var notifier = require('node-notifier');
var util = require('gulp-util');
var gulpif = require('gulp-if');
var browserSync = require('browser-sync');
var spawn = require('child_process').spawn;


var appBundle = browserify({
  entries: './public/js/main.js',
});

function bundle() {
  if (process.env.NODE_ENV === 'production') {
    console.log('watchify: rebuilding bundle');
  }
  return appBundle
    .bundle()
    .on('error', function(err) {
      console.log('Error: ' + err.message);
    })
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(gulpif(process.env.NODE_ENV === 'production', uglify()))
      .pipe(size({
        showFiles: true,
        gzip: true,
        title: 'js'
      }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./public/'))
    .pipe(browserSync.reload({ stream: true }));
}

appBundle.on('update', bundle);

gulp.task('browserify', function() {
  if (process.env.NODE_ENV !== 'production') {
    appBundle = watchify(appBundle);
  }
  bundle();
});
gulp.task('serve', ['browserify'], function() {
  var server = spawn('node', ['server.js']);

  server.stdout.on('data', function(data) {
    console.log('' + data);
  });

  server.stderr.on('data', function(data) {
    console.log('ERR: ' + data);
  });

  server.on('close', function(code) {
    console.log('child process exited with code ' + code);
  });
});
