const Router = require('koa-router')
const controller = require('../controller/moment.controller')
const { varifyAuth } = require('../midddleware/auth.middleware')

const momentRouter = new Router({ prefix: '/moment' })

momentRouter.post('/publish', varifyAuth, controller.publish)
momentRouter.get('/:momentId', controller.getMomentDetailById)

module.exports = momentRouter
export {}
