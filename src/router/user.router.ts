// 用户相关路由
const Router = require('koa-router')

const controller = require('../controller/user.controller')
const { verifyUser, handlePassword } = require('../midddleware/user.middleware')

const userRouter = new Router({ prefix: '/users' })

userRouter.post('/registry', verifyUser, handlePassword, controller.create)

module.exports = userRouter
export {}
