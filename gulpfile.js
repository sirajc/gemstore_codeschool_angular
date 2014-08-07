//noinspection JSUnresolvedFunction
var gulp = require('gulp'),
    connect = require('gulp-connect'),
    plumber = require('gulp-plumber');

/********* CONFIGURATIONS *****************/
var serverPort = 8000;
var livereloadPort = 35777;

/********* UTIL FUNCTIONS FOR THIS GULPFILE.js *****************/
function logError(error) {
    gutil.log(gutil.colors.red(error.message));
    gutil.beep();
    this.emit('end');
};

gulp.task('reload', function(){
    return gulp.src(['src/angular/**/*.css',
        'src/angular/**/*.js',
        'src/angular/**/*.html'])
        .pipe(plumber(logError))
        .pipe(connect.reload());
})

gulp.task('watch', function(){
   gulp.watch(['src/angular/**/*.css',
       'src/angular/**/*.js',
           'src/angular/**/*.html'], ['reload'])
});

/********* TASKS *****************/
gulp.task('default', ['watch'], function() {
    connect.server({
        root: ['src/angular'],
        livereload: true,
        port: serverPort,
        fallback: 'src/angular/index.html',
        livereload : { port: livereloadPort }
    });
});