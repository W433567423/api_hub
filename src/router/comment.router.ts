const Router = require('koa-router')
const { verifyAuth, verifyPermission } = require('../midddleware/auth.middleware')
const controller = require('../controller/comment.controller')

const commentRouter = new Router({ prefix: '/comment' })

commentRouter.post('/publish', verifyAuth, controller.publish)
commentRouter.post('/reply', verifyAuth, controller.reply)

commentRouter.patch('/changeComment/:commentId', verifyAuth, verifyPermission('comment'), controller.changeCommentById)

module.exports = commentRouter
export {}
