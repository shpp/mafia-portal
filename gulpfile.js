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

var reload  = browserSync.reload;

gulp.task('php', function() {
    php.server({ base: 'public', port: 8010, keepalive: true});
});

gulp.task('browser-sync',['php'], function() {
    browserSync({
        proxy: '127.0.0.1:8010',
        port: 8080,
        open: true,
        notify: false
    });
});

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
    .pipe(gulp.dest(config.css_dest));
});

// Task for clean folders
gulp.task('clean-styles', function() {
  var files = config.css_dest + '*.css';
  clean(files);
});

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

// --------------------------------------------------------------------
// Task: Watch
// --------------------------------------------------------------------

gulp.task('watch', function () {
  gulp.watch(config.css_src, [reload]);
  gulp.watch(config.php_src, [reload]);
  gulp.watch(config.alljs, [reload]);
  gulp.watch( config.root_js, [reload]);
  gulp.watch(config.less_src, ['styles']);
});

// --------------------------------------------------------------------
// Task: Default
// --------------------------------------------------------------------

gulp.task('default', ['browser-sync', 'styles', 'watch']);
