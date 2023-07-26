const Router = require('koa-router')
const controller = require('../controller/auth.controller')
const { varifyLogin } = require('../midddleware/auth.middleware')

const authRouter = new Router()

authRouter.post('/login', varifyLogin, controller.login)

module.exports = authRouter
