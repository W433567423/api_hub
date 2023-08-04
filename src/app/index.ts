// 全局app
import { koaSwagger } from 'koa2-swagger-ui'

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const useRouters = require('../router')
const { errorHandle } = require('./error-handle')
const swagger = require('./swagger')

const app = new Koa()

app.use(bodyParser())

// 路由注册
useRouters(app)

app.on('error', errorHandle)

app.use(swagger.routes(), swagger.allowedMethods())
app.use(
  koaSwagger({
    routePrefix: '/swagger', // host at /swagger instead of default /docs
    swaggerOptions: {
      url: '/swagger.json' // example path to json
    }
  })
)

module.exports = app
export {}
