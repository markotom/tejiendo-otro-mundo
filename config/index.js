import { defaultsDeep } from 'lodash'
import defaults from 'config/default'

const env = process.env.NODE_ENV

let config = { ...defaults }

env && (
  config = defaultsDeep(require(`./${env}`).default, config)
)

export default config
