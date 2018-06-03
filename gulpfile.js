var gulp = require('gulp');
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");
var browserify = require("browserify");
var tsify = require("tsify");
var del = require("del");
var vinylPaths = require("vinyl-paths");
var typescript = require("gulp-typescript");
var nodemon = require("gulp-nodemon");
var less = require("gulp-less");
var path = require("path");
var browserSync = require("browser-sync").create();
var FileChace = require('gulp-file-cache');
var cache = new FileChace();

var sources = {
    views: "app/**/*.jade",
    dist: "dist",
    serverMain: "app/app.ts",
    bin: "app/bin/www.*",
    scripts: "app/public/**/*.js",
    less: "app/**/*.less",
    binDist: "dist/bin/www",
    engineDest: "dist/engine"
};

var bowserifySettings = {
    baseDir: "app/engine",
    enties: "main.js",
    debug: true,
    cache: {},
    packageCache: {}
};

var assetCompilation = ["build", "copy-views", "copy-css", "copy-scripts"];

gulp.task("build-server", function() {
    var tsProject = typescript.createProject('tsconfig.json');
    var tsResult = tsProject.src().pipe(tsProject());
    return tsResult.js.pipe(gulp.dest(sources.dist));
});

gulp.task("clean", function() {
    cache.clear();
    return gulp.src("dist/*")
                .pipe(vinylPaths(del));
});

gulp.task("copy-views", function() {
    return gulp
            .src(sources.views)
            .pipe(cache.filter())
            .pipe(cache.cache())
            .pipe(gulp.dest(sources.dist));
});

gulp.task("copy-scripts", function() {
    return gulp
        .src(sources.scripts)
        .pipe(cache.filter())
        .pipe(cache.cache())
        .pipe(gulp.dest(sources.dist));
});

gulp.task("copy-css", function() {
    return gulp
        .src(sources.less)
        .pipe(cache.filter())
        .pipe(less())
        .pipe(cache.cache())
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
        .pipe(source('GameEngine.js'))
        .pipe(gulp.dest(sources.engineDest));
});

gulp.task("start-server", function(done) {
    cache.clear();
    var nodemonStream = nodemon({
        script: 'dist/bin/www.js',
        env: {"NODE_ENV": "development"},
        ext: 'jade js ts less',
        watch: ['app/public', 'app/views', 'app/engine'],
        ignore: ['app.ts', 'www.*'],
        tasks: function(changedFiles) {
            var tasks = [];
            changedFiles.forEach(function(file) {
                if(path.extname(file) == ".js" && !~tasks.indexOf('copy-scripts')) tasks.push('copy-scripts');
                if(path.extname(file) == ".jade" && !~tasks.indexOf('copy-views')) tasks.push('copy-views');
                if(path.extname(file) == ".ts" && !~tasks.indexOf('build')) tasks.push('build');
                if(path.extname(file) == ".less" && !~tasks.indexOf('copy-css')) tasks.push('copy-css');
            });
            return tasks;
        }
    }).on('start', function() {
        browserSync.reload();
    });

    browserSync.init({
        port: 5000,
        notify: true,
        proxy: "localhost:3000"
    });

    return nodemonStream;
});

gulp.task("default",
    gulp.series(
        "clean", 
        gulp.parallel("build-server", assetCompilation)));
