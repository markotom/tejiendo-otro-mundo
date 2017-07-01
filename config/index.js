import { defaultsDeep } from 'lodash'
import { config as defaults } from 'config/default'

const env = process.env.NODE_ENV

let config = { ...defaults }

env && (
  config = defaultsDeep(require(`./${env}`).default, config)
)

export default config
