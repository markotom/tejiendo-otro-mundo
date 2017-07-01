export const config = {
  server: {
    port: process.env.PORT || 1337
  },
  mongo: {
    port: 27017,
    host: 'localhost',
    db: 'tom-dev',
    user: '',
    password: ''
  },
  redis: {
    host: '127.0.0.1',
    port: 6379
  },
  jwt: {
    key: 'D}#4c.`X7r;!gx:6',
    options: {
      expiresIn: '36h'
    }
  }
}
