import gulp from 'gulp'
import { reload } from 'browser-sync'

export default {
  deps: [
    'clean',
    'compile',
    'styles'
  ],
  fn () {
    gulp.watch(['app/views/**/*.njk'], reload)
    gulp.watch(['app/views/**/*.scss'], ['styles'])
  }
}
