const Router = require('koa-router')

const authRouter = new Router()

// const { login } = require('../controller/auth.controller')

authRouter.post('/login')

module.exports = authRouter
