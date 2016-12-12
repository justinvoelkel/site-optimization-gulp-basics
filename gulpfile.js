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
        //.pipe(concat('main.scss'))
        //.pipe(gulp.dest('./styles/development/'))
        .pipe(sass())
        .pipe(concat('main.css'))
        .pipe(gulp.dest('./styles/development/'))
        .pipe(rename('main.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./styles/production/'));
});

gulp.task('scripts',function(){
    var scriptSrc =[
        'assets/js/development/lib/jquery.min.js',
        'assets/js/development/lib/bootstrap.min.js',
        'assets/js/development/lib/autocomplete.js',
        'assets/js/development/lib/starRating.js',
        'assets/js/development/lib/yt-modal-bug.js',
        'assets/js/development/lib/mobile-nav.js',
        'assets/js/development/lib/on-load.js'

    ];
    gulp.src(scriptSrc)
        .pipe(concat('production.js'))
        .pipe(gulp.dest('assets/js/production/'))
        .pipe(rename('production.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js/production/'))
});

gulp.task('images',function(){
    return gulp.src('../images/*')
        .pipe(imagemin({
            progressive:true,
            svgPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('../images'));
});

gulp.task('watch', function() {
    gulp.watch('assets/styles/development/**/*.css',['styles']);
    gulp.watch(
        ['assets/js/development/**/*.js','!assets/js/production/*.js'],
        ['scripts']
    );
});

gulp.task('default', ['styles','scripts','images']);
