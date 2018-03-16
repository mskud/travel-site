var gulp = require('gulp'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create();

//Watch:
gulp.task('watch', function () {
    //Auto open browser
    browserSync.init({
        server: {
            baseDir: "app"
        },
        browser: "chrome"
    });

    //Auto refresh HTML changes
    watch('./app/index.html', function () {
        browserSync.reload();
    });

    //Manage CSS styles
    watch('./app/assets/styles/**/*.css', function () {
        gulp.start('cssInject');
    });
});

//Auto refresh CSS changes
gulp.task('cssInject', /* dependecy first: */ ['styles'], function () {
    return gulp.src('./app/temp/styles/styles.css')
        .pipe(browserSync.stream());
});