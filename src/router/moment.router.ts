const Router = require('koa-router')
const controller = require('../controller/moment.controller')
const { verifyAuth } = require('../midddleware/auth.middleware')

const momentRouter = new Router({ prefix: '/moment' })

momentRouter.post('/publish', verifyAuth, controller.publish)
momentRouter.get('/:momentId', controller.getMomentDetailById)
momentRouter.post('/getMomentDetailList', controller.getMomentDetailByIds)

module.exports = momentRouter
export {}
