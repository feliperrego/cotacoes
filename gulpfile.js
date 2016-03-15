'use strict';

var env         = require('gulp-env');
var less        = require('gulp-less');
var path        = require('path');
var gulp        = require('gulp');
var buffer      = require('gulp-buffer');
var source      = require('vinyl-source-stream');
var uglify      = require('gulp-uglify');
var gulpif      = require('gulp-if');
var cssmin      = require('gulp-cssmin');
var nodemon     = require('gulp-nodemon');
var imagemin    = require('gulp-imagemin');
var pngquant    = require('imagemin-pngquant');
var browserify  = require('browserify');

// Grunt config
var server 		= 'server/';
var client 		= 'client/';
var	nodeApp 	= server + 'index.js';
var buildFolder;


// Generic function to execute gulp tasks
function execTasks() {
    var tasks = [];
    if (process.env.NODE_ENV == "prod") {
        tasks.push('browserify', 'less', 'imagemin', 'copy-html');
    } else {
        tasks.push('browserify', 'less')
    }
    gulp.start(tasks);
}

// Set production environment
gulp.task("production", function () {
    env({vars: {NODE_ENV: "prod"}});
    console.log("Set NODE_ENV=", process.env.NODE_ENV);
});

// Start the server
gulp.task("start", function () {
    return nodemon({
        script: nodeApp,
        ignore: ['app.js', 'style.css'],
        ext: "js css less",
        watch: [client]
    })
        .on('start', execTasks)
        .on('change', execTasks);
});

// Compile all less files
gulp.task('less', function () {
    buildFolder = process.env.NODE_ENV == "prod" ? path.join(__dirname, './dist') : path.join(__dirname, './client');
    return gulp.src(client + 'assets/less/style.less')
        .pipe(less({
            paths: [path.join(__dirname, 'less', 'includes')]
        }))
        .pipe(gulpif(process.env.NODE_ENV == "prod", cssmin()))
        .pipe(gulp.dest(buildFolder));
});

// Concatenate and compress all js files
gulp.task('browserify', function () {
    buildFolder = process.env.NODE_ENV == "prod" ? path.join(__dirname, './dist') : path.join(__dirname, './client');
    return browserify({entries: [client + 'app/app.module.js']})
        .bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(gulpif(process.env.NODE_ENV == "prod", uglify()))
        .pipe(gulp.dest(buildFolder))
});

// Optimize all images
gulp.task('imagemin', function () {
    return gulp.src(client + 'assets/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(path.join(__dirname, './dist/assets/images')));
});

//Task to copy the html files
gulp.task('copy-html', function() {
    return gulp.src(client + '**/*.html')
        .pipe(gulp.dest(path.join(__dirname, './dist')));
});

gulp.task("default", ["start"]);