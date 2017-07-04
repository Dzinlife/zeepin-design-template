const gulp = require('gulp')
const stylus = require('gulp-stylus')
const plumber = require("gulp-plumber")
const autoprefixer = require('gulp-autoprefixer')

function buildStyle(path){
  gulp.src(['src/styles/**/*.styl'])
    .pipe(plumber())
    .pipe(stylus())
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
    }))
    .pipe(gulp.dest('dist/css'))
    .on('end', () => {
      console.log(`${path}`)
    })
}

function copyBootstrapFiles(){
  gulp.src(['zeepin-bootstrap/dist/css/bootstrap.css', 'zeepin-bootstrap/dist/css/bootstrap.min.css'])
    .pipe(gulp.dest('dist/css'))

  gulp.src(['zeepin-bootstrap/dist/js/bootstrap.js', 'zeepin-bootstrap/dist/js/bootstrap.min.js'])
    .pipe(gulp.dest('dist/js'))
}

gulp.task('watch-css', () => {
  gulp.watch(['src/styles/**/*.styl'], e => {
    buildStyle(e.path)
  })

})

gulp.task('build-css', () => {
  buildStyle()
})

gulp.task('watch', () => {
  gulp.start('watch-css')

  gulp.watch(['zeepin-bootstrap/dist/css/bootstrap.css', 'zeepin-bootstrap/dist/css/bootstrap.min.css'], e => {
    copyBootstrapFiles()
  })
})

gulp.task('build', () => {
  gulp.start('build-css')
  copyBootstrapFiles()
})
