import nodemon from 'gulp-nodemon'
import { reload } from 'browser-sync'

export default {
  deps: ['compile'],
  fn () {
    return nodemon({
      script: 'dist/app',
      ext: 'js',
      ignore: [
        'dist',
        'test',
        'node_modules'
      ],
      tasks: ['compile'],
      env: {
        NODE_PATH: './dist',
        NODE_ENV: 'development'
      }
    }).on('start', () => setTimeout(reload, 400))
  }
}
