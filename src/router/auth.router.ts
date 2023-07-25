const Router = require('koa-router')
const controller = require('../controller/auth.controller')

const authRouter = new Router()

authRouter.post('/login', controller.login)

module.exports = authRouter
