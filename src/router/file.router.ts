const Router = require('koa-router')
const { verifyAuth } = require('../midddleware/auth.middleware')
const { avatarHandler } = require('../midddleware/file.middleware')
const controller = require('../controller/file.controller')

const fileRouter = new Router({ prefix: '/file' })

fileRouter.post('/avatar', verifyAuth, avatarHandler, controller.saveAvatarInfo)
fileRouter.get('/avatar/:userId', controller.getAvatarInfo)

module.exports = fileRouter
export {}
