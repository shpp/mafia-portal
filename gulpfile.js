var gulp = require('gulp');
var args = require('yargs').argv;
var $ = require('gulp-load-plugins')({lazy:true});
var config = require('./gulp.config')();
var del = require('del');
var browserSync = require("browser-sync");
var port = 8080;

// Task for js-code analysis files
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

// Task for compilation less to css
gulp.task('styles', ['clean-styles'], function() {
  log('Compiling Less --> CSS');
  return gulp
    .src(config.less)
    .pipe($.plumber())
    .pipe($.less())
    .pipe($.autoprefixer({browsers:['last 2 version','> 5%']}))
    .pipe(gulp.dest(config.css_dest))
    .pipe(browserSync.reload({stream: true}));
});

// Task for clean folders
gulp.task('clean-styles', function() {
  var files = config.css_dest + '*.css';
  clean(files);
});

// Task for watch less
gulp.task('less-watcher', function() {
  gulp.watch([config.less_src], ['styles']);
})

// Function for clean
function clean(path) {
  log('cleaning:' + $.util.colors.blue(path));
  del(path);
}


// Function loging
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


