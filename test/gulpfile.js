const
    gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    sassGlob = require('../index.js');

//SCSS сборка
const compileSass = () => {
    return gulp.src([
        './sass/**/*.scss',
        '!./sass/**/_*.scss'
    ])
        .pipe(sassGlob({
            nosort: true
        }))
        .pipe(sass())
        .pipe(gulp.dest('./dest/css/'));
}

gulp.task('sass', compileSass);
