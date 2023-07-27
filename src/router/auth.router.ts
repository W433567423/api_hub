const Router = require('koa-router')
const controller = require('../controller/auth.controller')
const { verifyLogin } = require('../midddleware/auth.middleware')

const authRouter = new Router()

authRouter.post('/login', verifyLogin, controller.login)

module.exports = authRouter
