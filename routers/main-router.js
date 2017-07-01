import Router from 'koa-joi-router'
import { main } from 'controllers/main-controller'

/**
 * Create router
 */
const router = Router()

/**
 * Add main route
 */
router.get('/', main)

export default router
