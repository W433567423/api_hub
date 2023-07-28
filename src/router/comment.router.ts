const Router = require('koa-router')
const { verifyAuth } = require('../midddleware/auth.middleware')
const controller = require('../controller/comment.controller')

const commentRouter = new Router({ prefix: '/comment' })

commentRouter.post('/publish', verifyAuth, controller.publish)

module.exports = commentRouter
export {}
