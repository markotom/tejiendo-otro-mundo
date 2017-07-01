import config from 'config'
import Koa from 'koa'
import serve from 'koa-static'
import views from 'koa-views'
import logger from 'koa-logger'
import { main } from 'routers'

/**
 * Create application
 */
const app = new Koa()

/**
 * Set logger
 */
.use(logger())

/**
 * Set views engine
 */
.use(views('app/views', {
  extension: 'njk',
  map: {
    njk: 'nunjucks'
  },
  options: {
    settings: {
      views: 'app/views'
    }
  }
}))

/**
 * Set static files
 */
.use(serve('public'))

/**
 * Set routes
 */
.use(main.middleware())

/**
 * Server listening
 */
.listen(config.server.port, () => {
  console.log(`Server listening at ${config.server.port}`)
})

export default app
