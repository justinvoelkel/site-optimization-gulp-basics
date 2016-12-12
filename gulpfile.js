/**
 * Created by justin on 3/25/2015.
 */
var gulp = require('gulp');

var minifyCSS   = require('gulp-clean-css');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var imagemin    = require('gulp-imagemin');
var rename      = require('gulp-rename');
var sass        = require('gulp-sass');

gulp.task('styles',function(){
    var stylesSrc = [
        './styles/development/scss/**/*.scss'
    ];
    return gulp.src(stylesSrc)
        .pipe(sass())
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./styles/production/'))
        .pipe(rename('main.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./styles/production/'));
});

gulp.task('scripts',function(){
    var scriptSrc =[
        './js/development/vendor/**/*.js',
        './js/development/foundation/**/*.js',
        './js/development/app.js'

    ];
    gulp.src(scriptSrc)
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./js/production/'))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./js/production/'));
});

gulp.task('images',function(){
    return gulp.src('./images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./images'));
});

gulp.task('watch', function() {
    gulp.watch('./styles/development/**/*.css', ['styles']);
    gulp.watch('./js/development/**/*.js', ['scripts']);
});

gulp.task('default', ['styles','scripts','images']);
