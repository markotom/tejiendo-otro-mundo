import sync from 'browser-sync'

export default () => {
  sync({
    proxy: 'localhost:1337',
    logLevel: 'silent',
    open: false,
    notify: false
  })
}
