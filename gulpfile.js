'use strict';

var env         = require('gulp-env');
var less        = require('gulp-less');
var path        = require('path');
var gulp        = require('gulp');
var buffer      = require('gulp-buffer');
var source      = require('vinyl-source-stream');
var config      = require("./gulp.config")();
var uglify      = require('gulp-uglify');
var gulpif      = require('gulp-if');
var cssmin      = require('gulp-cssmin');
var nodemon     = require('gulp-nodemon');
var imagemin    = require('gulp-imagemin');
var pngquant    = require('imagemin-pngquant');
var browserify  = require('browserify');


// Set production environment
gulp.task("production", function () {
    env({vars: {NODE_ENV: "prod"}});
    console.log("Set NODE_ENV=", process.env.NODE_ENV);
});

// Start the server
gulp.task("start", function () {
    return nodemon({
        script: config.nodeApp,
        ignore: ['dist/**'],
        ext: "js css less",
        watch: [config.client]
    })
        .on('start', ['browserify', 'less', 'imagemin', 'copy-html'])
        .on('change', ['browserify', 'less', 'imagemin', 'copy-html'])
        .on('restart', function () {
            console.log('Restarted!');
        });
});

// Compile all less files
gulp.task('less', function () {
    return gulp.src(config.client + 'assets/less/style.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulpif(process.env.NODE_ENV == "prod", cssmin()))
        .pipe(gulp.dest(config.buildFolder));
});

// Concatenate and compress all js files
gulp.task('browserify', function () {
    return browserify({entries: [config.client + 'app.js']})
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(gulpif(process.env.NODE_ENV == "prod", uglify()))
        .pipe(gulp.dest(config.buildFolder))
});

// Optimize all images
gulp.task('imagemin', function () {
    return gulp.src(config.client + 'assets/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(config.buildFolder + 'images'));
});

//Task to copy the html files
gulp.task('copy-html', function() {
    gulp.src(config.client + '**/*.html')
        .pipe(gulp.dest(config.buildFolder));
});

gulp.task("default", ["start"]);