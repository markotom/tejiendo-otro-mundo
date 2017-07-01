import { src, dest } from 'gulp'
import babel from 'gulp-babel'

export default () => {
  return src([
    'app/**/*.js',
    'config{,/**/*.js}',
    'app.js'
  ])
  .pipe(babel())
  .pipe(dest('./dist'))
}
