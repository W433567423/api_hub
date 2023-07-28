const Router = require('koa-router')
const controller = require('../controller/moment.controller')
const { verifyAuth, verifyPermission } = require('../midddleware/auth.middleware')

const momentRouter = new Router({ prefix: '/moment' })

momentRouter.post('/publish', verifyAuth, controller.publish)
momentRouter.get('/:momentId', controller.getMomentDetailById)
momentRouter.post('/getMomentDetailList', controller.getMomentDetailByIds)
momentRouter.patch('/changeMomentDetail/:momentId', verifyAuth, verifyPermission('moment'), controller.changeMomentById)
momentRouter.delete('/delMoment/:momentId', verifyAuth, verifyPermission('moment'), controller.delMomentById)

module.exports = momentRouter
export {}
