import babel from 'gulp-babel'
import Cache from 'gulp-file-cache'
import del from 'del'
import gulp, { src, dest } from 'gulp'
import nodemon from 'gulp-nodemon'
import sync, { reload } from 'browser-sync'
import sass from 'gulp-sass'

/**
 * Create cache instance for babel builds
 */
const cache = new Cache()

/**
 * Browser sync task
 */
gulp.task('browser:sync', function () {
  sync({
    proxy: 'localhost:1337',
    logLevel: 'silent',
    open: false,
    notify: false
  })
})

/**
 * Compile task
 */
gulp.task('compile', () => {
  return src([
    'app/**/*.js',
    'config{,/**/*.js}',
    'controllers{,/**/*.js}',
    'routers{,/**/*.js}',
    'app.js'
  ])
  .pipe(cache.filter())
  .pipe(babel())
  .pipe(cache.cache())
  .pipe(dest('./dist'))
})

/**
 * Styles task
 */
gulp.task('styles', () => {
  return src([
    'app/views/styles/app.scss'
  ])
  .pipe(sass({
    outputStyle: 'expand'
  }).on('error', sass.logError))
  .pipe(dest('./public/css'))
  .pipe(sync.stream())
})

/**
 * Serve task
 */
gulp.task('serve', ['compile'], () => {
  return nodemon({
    script: 'dist/app',
    ext: 'js',
    ignore: [
      'dist',
      'node_modules',
      'gulpfile.*'
    ],
    tasks: ['compile'],
    env: {
      NODE_PATH: './dist',
      NODE_ENV: 'development'
    }
  }).on('start', () => setTimeout(reload, 400))
})

/**
 * Clean assets task
 */
gulp.task('clean:assets', () => {
  return del('public/css')
})

/**
 * Clean server task
 */
gulp.task('clean:server', () => {
  return del([
    'dist',
    '.gulp-cache'
  ])
})

/**
 * Clean task
 */
gulp.task('clean', ['clean:server', 'clean:assets'])

/**
 * Watch task
 */
gulp.task('watch', ['serve', 'browser:sync', 'styles'], () => {
  gulp.watch(['app/views/**/*.njk'], reload)
  gulp.watch(['app/views/**/*.scss'], ['styles'])
})
