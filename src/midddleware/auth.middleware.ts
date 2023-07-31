import { type IUser } from '../service/type'

const jwt = require('jsonwebtoken')
const errorType = require('../constants/error-types')
const userService = require('../service/user.service')
const MomentService = require('../service/moment.service')
const CommentService = require('../service/comment.service')
const { md5Password } = require('../utils')
const { PUBLIC_KEY } = require('../app/config')

const verifyLogin = async (ctx: any, next: any) => {
  // 获取用户名密码
  const { username, password }: { username: string | undefined, password: string | undefined } = ctx.request.body

  // 判断用户名密码为空
  if (!username || !password) {
    const error = new Error(errorType.USERNAME_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }

  // 判断用户名是否存在
  let dbRes: any
  try {
    dbRes = await userService.getUserByName(username)
  } catch (e) {
    const error = new Error(errorType.SQL_ERROR)
    return ctx.app.emit('error', error, ctx)
  }
  if (!dbRes[0].length) {
    const error = new Error(errorType.USERNAME_NOT_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }

  // 判断密码和数据库中是否一致(加密)
  if (md5Password(password) !== dbRes[0][0].password) {
    const error = new Error(errorType.PASSWORD_ERROR)
    return ctx.app.emit('error', error, ctx)
  }
  ctx.user = dbRes[0][0]
  await next()
}

const verifyAuth = async (ctx: any, next: any) => {
  const Authorization: string | undefined = ctx.request.headers.authorization?.replaceAll(' ', '')
  if (!Authorization) {
    const error = new Error(errorType.NO_TOKEN)
    return ctx.app.emit('error', error, ctx)
  }
  try {
    // console.log(Authorization)
    ctx.user = jwt.verify(Authorization, PUBLIC_KEY, { algorithms: ['RS256'] })
    await next()
  } catch {
    console.log('<-token解密失败')
    const error = new Error(errorType.NO_TOKEN)
    return ctx.app.emit('error', error, ctx)
  }
}

const verifyPermission = (tableName: string) => {
  switch (tableName) {
    case 'comment':
      return async (ctx: any, next: any) => { // 取参
        const { commentId }: { commentId: number | undefined } = ctx.request.params
        const userId = (ctx.user as IUser).id
        if (!commentId) {
          const error = new Error(errorType.NO_PARAMS)
          return ctx.app.emit('error', error, ctx)
        }

        // 拿到该动态
        const isPermission = await CommentService.getCommentByIdAndUserId(userId, commentId)
        if (!isPermission) {
          const error = new Error(errorType.NO_PERMISSION)
          return ctx.app.emit('error', error, ctx)
        }

        await next()
      }
    case 'moment':
      return async (ctx: any, next: any) => {
        // 取参
        const { momentId }: { momentId: number | undefined } = ctx.request.params
        const userId = (ctx.user as IUser).id
        if (!momentId) {
          const error = new Error(errorType.NO_PARAMS)
          return ctx.app.emit('error', error, ctx)
        }

        // 拿到该动态
        const isPermission = await MomentService.getMomentByIdAndUserId(momentId, userId)
        if (!isPermission) {
          const error = new Error(errorType.NO_PERMISSION)
          return ctx.app.emit('error', error, ctx)
        }

        await next()
      }
    default:
      console.log('校验权限异常')
  }
}

module.exports = { verifyLogin, verifyAuth, verifyPermission }
export {}
