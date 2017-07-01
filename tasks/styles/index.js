import { src, dest } from 'gulp'
import sass from 'gulp-sass'
import sync from 'browser-sync'

export default () => {
  return src([
    'app/views/styles/styles.scss'
  ])
  .pipe(sass({
    outputStyle: 'expand'
  }).on('error', sass.logError))
  .pipe(dest('./public/css'))
  .pipe(sync.stream())
}
