const Router = require('koa-router')
const controller = require('../controller/moment.controller')
const { photosHandler } = require('../midddleware/file.middleware')
const { verifyAuth, verifyPermission } = require('../midddleware/auth.middleware')
const { isExistLabels } = require('../midddleware/label.middleware')

const momentRouter = new Router({ prefix: '/moment' })

momentRouter.post('/publish', verifyAuth, controller.publish)

momentRouter.get('/:momentId', controller.getMomentDetailById)
momentRouter.post('/getMomentDetailList', controller.getMomentDetailByIds)

momentRouter.patch('/changeMomentDetail/:momentId', verifyAuth, verifyPermission('moment'), controller.changeMomentById)
momentRouter.delete('/delMoment/:momentId', verifyAuth, verifyPermission('moment'), controller.delMomentById)

momentRouter.post('/:momentId/addLabels', verifyAuth, verifyPermission('moment'), isExistLabels, controller.addLabels)

momentRouter.post('/publishImage', verifyAuth, photosHandler, controller.publishImage)

module.exports = momentRouter
export {}
