const Router = require('koa-router')
const controller = require('../controller/auth.controller')
const { verifyLogin } = require('../midddleware/auth.middleware')

const authRouter = new Router()
/**
 * @swagger
 * /logger/apps:
 *   get:
 *     summary: 获取有日志记录的应用
 *     description: 获取有日志记录的应用
 *     tags:
 *       - Logger
 *     parameters:
 *       - name: appName
 *         in: query
 *         required: true
 *         description: 应用名称
 *         type: string
 *       - name: userId
 *         in: query
 *         required: true
 *         description: 用户id
 *         type: string
 *     responses:
 *       200:
 *         description: 成功获取
 */
authRouter.post('/login', verifyLogin, controller.login)

module.exports = authRouter
