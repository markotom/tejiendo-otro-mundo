import babel from 'gulp-babel'
import Cache from 'gulp-file-cache'

const cache = new Cache()

export default ({ src, dest }) => {
  return src([
    'app/**/*.js',
    'config{,/**/*.js}',
    'app.js'
  ])
  .pipe(cache.filter())
  .pipe(babel())
  .pipe(cache.cache())
  .pipe(dest('./dist'))
}
