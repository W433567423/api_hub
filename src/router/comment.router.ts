const Router = require('koa-router')
const { verifyAuth, verifyPermission } = require('../midddleware/auth.middleware')
const controller = require('../controller/comment.controller')

const commentRouter = new Router({ prefix: '/comment' })

commentRouter.post('/publish', verifyAuth, controller.publish)
commentRouter.post('/reply', verifyAuth, controller.reply)

commentRouter.patch('/changeComment/:commentId', verifyAuth, verifyPermission('comment'), controller.changeCommentById)
commentRouter.delete('/deleteComment/:commentId', verifyAuth, verifyPermission('comment'), controller.deleteCommentById)

commentRouter.get('/:momentId', controller.getCommentsById)

module.exports = commentRouter
export {}
