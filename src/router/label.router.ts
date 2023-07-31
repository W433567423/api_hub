const Router = require('koa-router')
const controller = require('../controller/label.controller')

const labelRouter = new Router({ prefix: '/label' })

labelRouter.post('/newLabel', controller.newLabel)
labelRouter.get('/labelList', controller.getLabelList)

module.exports = labelRouter
export {}
