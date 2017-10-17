var gulp = require('gulp'),
    connect = require('gulp-connect'),
    minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    templateCache = require('gulp-angular-templatecache');
var inject = require('gulp-inject');

var jsDir = [
        './frontend/js/main.js',
        './frontend/js/services/*.js',
        './frontend/js/controllers/*.js'
    ],
    cssDir = [
        './frontend/css/*.css',
        './node_modules/mdi/css/materialdesignicons.min.css',
        './node_modules/angular-material/angular-material.css'
    ],
    vendorDir = [
        './node_modules/angular/angular.js',
        './node_modules/angular-animate/angular-animate.js',
	    './node_modules/angular-aria/angular-aria.js',
	    './node_modules/angular-material/angular-material.js',
	    './node_modules/angular-messages/angular-messages.js',
	    './node_modules/@uirouter/angularjs/release/angular-ui-router.js'
    ],
    targetJsDir = './dist/js',
    targetCssDir = './dist/css';

gulp.task('angular_templates', function () {
    gulp.src('./frontend/views/**/*.html')
        .pipe(templateCache({module:'cahsowan'}))
        .pipe(gulp.dest(targetJsDir))
        .pipe(connect.reload());
});

gulp.task('jsvendor', function() {
    gulp.src(vendorDir)
        .pipe(concat('vendor.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(targetJsDir))
        .pipe(connect.reload());
});

gulp.task('css', function () {
    return gulp.src(cssDir)
        .pipe(concat('style.min.css'))
        .pipe(minifyCSS({'keepSpecialComments-*':0}))
        .pipe(gulp.dest(targetCssDir))
        .pipe(connect.reload());
});

gulp.task('js', function() {
    gulp.src(jsDir)
        .pipe(concat('all.min.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest(targetJsDir))
        .pipe(connect.reload());
});

gulp.task('connect', function() {
    connect.server({
        root: './dist',
        livereload: true,
        port: 3000
    });
});

gulp.task('html', function () {
    gulp.src('./frontend/views/*.html')
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(['./**/*.html'], ['html', 'angular_templates']);
    gulp.watch([cssDir], ['css']);
    gulp.watch([jsDir], ['js'])
});

gulp.task('default', ['css', 'js', 'jsvendor', 'angular_templates', 'connect', 'watch']);