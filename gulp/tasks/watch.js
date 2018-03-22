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

    //Manage javascript files and webpack
    watch('./app/assets/scripts/**/*.js', function () {
        gulp.start('scriptsRefresh');
    });
});

//Auto refresh CSS changes
gulp.task('cssInject', /* dependecy first: */ ['styles'], function () {
    return gulp.src('./app/temp/styles/styles.css')
        .pipe(browserSync.stream());
});

//Refresh browser on javascript changes
gulp.task('scriptsRefresh', ['scripts'], function () {
    browserSync.reload();
});