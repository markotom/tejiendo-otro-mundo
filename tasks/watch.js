import { reload } from 'browser-sync'
import sequence from 'gulp-sequence'

export default {
  fn (gulp, callback) {
    sequence('clean', 'styles')(callback)

    gulp.watch(['app/views/**/*.njk'], reload)
    gulp.watch(['app/views/**/*.scss'], ['styles'])
  }
}
