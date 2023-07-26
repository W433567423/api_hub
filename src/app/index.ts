// 全局app
const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const useRouters = require('../router')
const { errorHandle } = require('./error-handle')

const app = new Koa()

app.use(bodyParser())

// 路由注册
useRouters(app)

app.on('error', errorHandle)

module.exports = app
export {}
