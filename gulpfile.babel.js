import babel from 'gulp-babel'
import Cache from 'gulp-file-cache'
import del from 'del'
import gulp, { src, dest } from 'gulp'
import nodemon from 'gulp-nodemon'
import { resolve } from 'path'
import sync, { reload } from 'browser-sync'
import sass from 'gulp-sass'
import webpack from 'gulp-webpack'

/**
 * Create cache instance for babel builds
 */
const cache = new Cache()

/**
 * Browser sync task
 */
gulp.task('browser:sync', function () {
  return sync({
    proxy: 'localhost:1337',
    logLevel: 'silent',
    open: true,
    notify: false,
    port: 8080,
    browser: 'google chrome'
  })
})

/**
 * Compile server task
 */
gulp.task('compile:server', () => {
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
 * Compile js task
 */
gulp.task('compile:js', () => {
  return src('app/assets/js/app.js')
  .pipe(cache.filter())
  .pipe(webpack({
    entry: {
      app: './app/assets/js/app'
    },
    output: {
      filename: '[name].js'
    },
    devtool: 'eval',
    module: {
      rules: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            babelrc: false,
            extends: resolve(__dirname, 'app/.babelrc')
          }
        }]
      }]
    }
  }))
  .pipe(cache.cache())
  .pipe(dest('public/js'))
  .pipe(sync.stream())
})

/**
 * Compile SCSS task
 */
gulp.task('compile:scss', () => {
  return src([
    'app/assets/css/app.scss'
  ])
  .pipe(sass({
    outputStyle: 'expand'
  }).on('error', sass.logError))
  .pipe(dest('public/css'))
  .pipe(sync.stream())
})

/**
 * Serve task
 */
gulp.task('serve', ['compile:server'], () => {
  return nodemon({
    script: 'dist/app',
    ext: 'js',
    ignore: [
      'dist',
      'public',
      'app/assets/js',
      'node_modules',
      'gulpfile.*'
    ],
    tasks: ['compile:server'],
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
  return del([
    'public/css',
    'public/js'
  ])
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
gulp.task('watch', ['serve', 'browser:sync', 'compile:js', 'compile:scss'], () => {
  gulp.watch(['app/views/**/*.njk'], reload)
  gulp.watch(['app/assets/js/**/*.js'], ['compile:js'])
  gulp.watch(['app/assets/css/**/*.scss'], ['compile:scss'])
})
