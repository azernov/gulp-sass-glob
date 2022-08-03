@artprog/gulp-sass-glob-import
=====================

gulp task to allow importing directories in your SCSS.

Different from [gulp-sass-glob-import](https://github.com/bleuarg/gulp-sass-glob-import): it allows to pass glob options by config.


## installation

```
npm install --save-dev @artprog/gulp-sass-glob-import
```


## usage


#### in your .scss file

```scss

@import "some/path/**/*.scss";

```

#### in your gulpfile

```js
const
    gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    sassGlob = require('gulp-sass-glob');

const compileSass = () => {
    return gulp.src([
        './path/to/your/scss-folder/**/*.scss',
        '!./path/to/your/scss-folder/**/_*.scss'
    ])
        .pipe(sassGlob({
            nosort: true //<-- we may pass glob parameters
        }))
        .pipe(sass())
        .pipe(gulp.dest('./path/to/your/css-folder/'));
}

gulp.task('sass', compileSass);
```
