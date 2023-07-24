// 用户相关路由
const Router = require('koa-router')

const controller = require('../controller/user.controller')
const { verifyUser } = require('../midddleware/user.middleware')

const userRouter = new Router({ prefix: '/users' })

userRouter.post('/', verifyUser, controller.create)

module.exports = userRouter
export {}
