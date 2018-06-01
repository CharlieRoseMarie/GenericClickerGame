var gulp = require('gulp');
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var browserify = require("browserify");
var tsify = require("tsify");
var del = require("del");
var vinylPaths = require("vinyl-paths");
var typescript = require("gulp-typescript");
var nodemon = require("gulp-nodemon");

var sources = {
    views: "app/**/*.jade",
    dist: "dist",
    serverMain: "app/app.ts",
    bin: "app/bin/www.*",
    scripts: "app/public/**/*.js",
    css: "app/**/*.css",
    binDist: "dist/bin/www"
};

var bowserifySettings = {
    basedir: ".",
    debug: true,
    entries: ['./app/engine/main.ts'],
    cache: {},
    packageCache: {}
};

gulp.task("build-server", function() {
    var tsProject = typescript.createProject('tsconfig.json');
    var tsResult = tsProject.src().pipe(tsProject());
    return tsResult.js.pipe(gulp.dest(sources.dist));
});

gulp.task("clean", function() {
    return gulp.src("dist/*")
                .pipe(vinylPaths(del));
});

gulp.task("copy-views", function() {
    return gulp
            .src(sources.views)
            .pipe(gulp.dest(sources.dist));
});

gulp.task("copy-scripts", function() {
    return gulp
        .src(sources.scripts)
        .pipe(gulp.dest(sources.dist));
});

gulp.task("copy-css", function() {
    return gulp
        .src(sources.css)
        .pipe(gulp.dest(sources.dist));
});

gulp.task('watch', function() {
    gulp.watch(sources.views, gulp.series('copy-views'));
    gulp.watch(sources.css, gulp.series('copy-css'));
});

gulp.task("build", function() {
    return browserify(bowserifySettings)
        .plugin(tsify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(sources.dist));
});

gulp.task("start-server", function(done) {
    nodemon({
        script: 'dist/bin/www.js',
        env: {"NODE_ENV": "development"}
    });
});

gulp.task("default",  
    gulp.series(
        "clean", 
        gulp.parallel("build-server", "build", "copy-views", "copy-css", "copy-scripts"), 
        "start-server",
        "watch"));