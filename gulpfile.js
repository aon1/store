var gulp = require('gulp'),
    connect = require('gulp-connect'),
    minifyCSS = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    ngAnnotate = require('gulp-ng-annotate'),
    templateCache = require('gulp-angular-templatecache');
var gls = require('gulp-live-server');
var inject = require('gulp-inject');
var del = require('del');
var util = require('util');
var shell = require('gulp-shell');
var prompt = require('gulp-prompt');

var jsDir = [
        './frontend/js/main.js',
        './frontend/js/services/**/*.js',
        './frontend/js/controllers/**/*.js'
    ],
    cssDir = [
        './frontend/css/style.css',
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
    targetCssDir = './dist/css',
    targetFontsDir = './dist/fonts';

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

gulp.task('fonts', function() {
    gulp.src('./frontend/fonts/*')
        .pipe(gulp.dest(targetFontsDir))
        .pipe(connect.reload());
});

gulp.task('connect', function() {
    connect.server({
        root: './dist',
        // livereload: true,
        port: 3001
    });
});

gulp.task('html', function () {
    gulp.src(['./frontend/index.html', './frontend/views/**/*.html'])
        .pipe(gulp.dest('dist/'))
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(['./**/*.html'], ['html']);
    gulp.watch([cssDir], ['css']);
    gulp.watch([jsDir], ['js'])
});

gulp.task('db', function() {
    gulp.src('').pipe(
        prompt.prompt([{
            type: 'input',
            name: 'username',
            message: 'Please enter your mysql username'
        }, {
            type: 'password',
            name: 'password',
            message: 'Please enter your mysql password'
        }], function(response) {
            var shellCommand;
            if (response.password == '') {
                shellCommand = util.format('mysql -u %s < data/dump.sql', response.username)
            } else {
                shellCommand = util.format('mysql -u %s -p%s < data/dump.sql', response.username, response.password);
            }

            gulp.src('').pipe(shell([shellCommand]));

            console.log('\n\x1b[32m%s\x1b[0m', 'Database created!');

        }));
});

gulp.task('clean', function () {
	return del(['dist']);
});

gulp.task('default', ['css', 'js', 'jsvendor', 'fonts', 'html', 'watch'], function() {
	var server = gls.new('./backend/bin/www');
	return server.start();
});