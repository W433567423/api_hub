// 用户相关路由
const Router = require('koa-router')

const controller = require('../controller/user.controller')

const userRouter = new Router({ prefix: '/users' })

userRouter.post('/', controller.create)

module.exports = userRouter
