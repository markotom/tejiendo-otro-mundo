import { src, dest } from 'gulp'
import sass from 'gulp-sass'
import rename from 'gulp-rename'
import chalk from 'chalk'
import clean from 'gulp-clean-css'
import uncss from 'gulp-uncss'
import size from 'gulp-size'

export default () => {
  const filesize = size({
    showTotal: false
  })

  return src([
    'app/views/styles/styles.scss'
  ])
  .pipe(sass({}).on('error', sass.logError))
  .pipe(filesize)
  .pipe(rename({ suffix: '.min' }))
  .pipe(uncss({
    html: ['app/views/**/*.njk']
  }))
  .pipe(clean({ debug: true }, ({ name, stats }) => {
    const bytesToSize = (bytes) => {
      let sizes = ['b', 'kb', 'mb']
      let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
      return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
    }

    console.log(chalk.yellow(`styles.css: ${bytesToSize(filesize.size)} (original)`))
    console.log(chalk.green(`${name}: ${bytesToSize(stats.minifiedSize)} (cleaned & minified)`))
  }))
  .pipe(dest('./public/css'))
}
