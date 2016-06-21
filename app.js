'use strict'

import http from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import expressSession from 'express-session'
import logger from 'morgan'
import favicon from 'serve-favicon'
import fallback from 'connect-history-api-fallback'
import connectRedis from 'connect-redis'
import redis from 'ioredis'

import socketIO from 'socket.io'
import socketSession from 'socket.io-express-session'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import webpackDevConfig from './webpack.config.dev'

import './models'
import config from './config'
import controllers from './controllers'

const env = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 3000
const redisStore = connectRedis(expressSession)

const app = express()
app.locals.ENV = env
app.locals.ENV_DEVELOPMENT = (env === 'development')

const session = expressSession({
  name: 'sweely.sess',
  secret: config.cookie.secret,
  saveUninitialized: false,
  resave: false,
  store: new redisStore({ client: new redis(config.redis)})
})

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(cookieParser(config.cookie.secret))
app.use(session)
app.use((req, res, next) => {
  res.success = function (data) {
    this.json({ _: 0, data })
  }
  res.fail = function (error) {
    this.json({ _: 1, error })
  }
  res.bad = function () {
    this.status(400).json({ _: 2, error: 'Bad request' })
  }
  res.forbidden = function () {
    this.status(400).json({ _: 4, error: 'Forbidden' })
  }
  next()
})
app.use(controllers)
app.use(fallback())
if (env === 'development') {
  const compiler = webpack(webpackDevConfig)
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: '/',
    stats: { colors: true }
  }))
  app.use(webpackHotMiddleware(compiler))
}
app.use(express.static(`${ROOT}/public`))

app.use((err, req, res, next) => {
  res.status(500).send(env === 'development' ? err.stack : 'Error')
  console.error(err)
})

const server = http.createServer(app)
const io = socketIO(server)
io.use(socketSession(session))
server.listen(port, () => {
  console.log(`==> Listen on ${server.address().port}`)
})
