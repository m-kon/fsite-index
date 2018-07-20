const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('autoprefixer');
const exec = require('child_process').exec;

gulp.task('sass', function() {
    return gulp.src('sass/*.sass')
        .pipe(sass())
        .pipe(gulp.dest('css/'));
});

gulp.task('autoprefixer', function () {
    return gulp.src('css/*.css')
        .pipe(sourcemaps.init())
        .pipe(postcss([ autoprefixer() ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./css'));
});

gulp.task('watch', gulp.series('sass', 'autoprefixer', function(done) {
    gulp.watch('sass/*.sass', gulp.series('sass', 'autoprefixer'));
    done();
}));

gulp.task('default', gulp.series('watch', function(done) {
    exec('live-server');
    done();
}));