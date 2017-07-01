import babel from 'gulp-babel'

export default ({ src, dest }) => {
  return src([
    'app/**/*.js',
    'config{,/**/*.js}',
    'app.js'
  ])
  .pipe(babel())
  .pipe(dest('./dist'))
}
