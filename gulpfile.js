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
        .pipe(concat('dev.css'))
        .pipe(gulp.dest('./styles/production/'))
        .pipe(rename('prod.min.css'))
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
        .pipe(concat('dev.js'))
        .pipe(gulp.dest('./js/production/'))
        .pipe(rename('prod.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./js/production/'));
});

gulp.task('images',function(){
    return gulp.src('./images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./images'));
});

gulp.task('watch', function() {
    gulp.watch('./styles/development/**/*.scss', ['styles']);
    gulp.watch('./js/development/**/*.js', ['scripts']);
});

gulp.task('default', ['styles','scripts','images']);
