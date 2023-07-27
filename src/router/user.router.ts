// 用户相关路由
const Router = require('koa-router')

const controller = require('../controller/user.controller')
const { verifyUser, handlePassword } = require('../midddleware/user.middleware')
const { verifyAuth } = require('../midddleware/auth.middleware')

const userRouter = new Router({ prefix: '/user' })

userRouter.post('/registry', verifyUser, handlePassword, controller.registry)
userRouter.post('/test', verifyAuth, controller.test)

module.exports = userRouter
export {}
