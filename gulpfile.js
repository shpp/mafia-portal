var gulp = require('gulp');
var args = require('yargs').argv;
var $ = require('gulp-load-plugins')({lazy:true});
var config = require('./gulp.config')();
var del = require('del');
var browserSync = require("browser-sync");
var php = require('gulp-connect-php');

// --------------------------------------------------------------------
// Task: Server
// --------------------------------------------------------------------

gulp.task('php', function() {
  php.server({
    base: 'public',
    port: 8010,
    keepalive: true
  });
});

gulp.task('browser-sync',['php'], function() {
  browserSync({
    // Settings browser-sync
    proxy: '127.0.0.1:8010',
    port: 8080,
    open: true,
    notify: false,
    reloadDelay: 1000
  });
});

gulp.task('reload', function () {
  log('browserSync reload');
  browserSync.reload();
});

// --------------------------------------------------------------------
// Task for js-code analysis files
// --------------------------------------------------------------------
gulp.task('vet', function() {
  log('Analyzing source with JSHint and JSCS');
  return gulp
    .src(config.alljs)
    .pipe($.if(args.verbose, $.print()))// gulp vet --verbose (print vet folders)
    .pipe($.jscs())
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish', { verbose: true }))
    .pipe($.jshint.reporter('fail'));
});

// --------------------------------------------------------------------
// Task for compilation less to css
// --------------------------------------------------------------------
gulp.task('styles', ['clean-styles'], function() {
  log('Compiling Less --> CSS');
  return gulp
    .src(config.less)
    .pipe($.plumber())
    .pipe($.less())
    .pipe($.autoprefixer({browsers:['last 2 version','> 5%']}))
    .pipe(gulp.dest(config.css_dest));
});

// Task for clean folders
gulp.task('clean-styles', function() {
  var files = config.css_dest + '*.css';
  clean(files);
});

// --------------------------------------------------------------------
// Function to clean the file according to a predetermined path
// --------------------------------------------------------------------
function clean(path) {
  log('cleaning:' + $.util.colors.blue(path));
  del(path);
}

// --------------------------------------------------------------------
// Task: Function log
// --------------------------------------------------------------------
function log(msg) {
  if(typeof(msg) === 'object') {
    for (var item in msg ) {
      if (msg.hasOwnProperty(item)) {
        $.util.log($.util.colors.blue(msg[item]));
      }
    }
  } else {
    $.util.log($.util.colors.blue(msg));
  }
}

// --------------------------------------------------------------------
// Task: Watch
// --------------------------------------------------------------------

gulp.task('watch', function () {
  gulp.watch('./public/css/*.css', ['reload']);
  gulp.watch('./resources/views/**/*.blade.php', ['reload']);
  gulp.watch(config.alljs, ['vet','reload']);
  gulp.watch(config.less_src, ['styles']);
});

// --------------------------------------------------------------------
// Task: Default
// --------------------------------------------------------------------

gulp.task('default', ['browser-sync','watch']);
