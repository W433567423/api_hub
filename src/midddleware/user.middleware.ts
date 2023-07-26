import { type ILoginParams } from '../service/type'

const errorType = require('../constants/error-types')
const service = require('../service/user.service')
const md5Password = require('../utils/password-handle')

/**
 * DONE
 * @description: 事件: 验证用户
 * @params: {}
 * @return: undefined
 * @author: tutu
 * @time: 2023/7/24 12:12
 */
const verifyUser = async (ctx, next) => {
  // 获取用户名,密码
  const { username, password } = ctx.request.body as ILoginParams

  // 判断用户名/密码不能为空
  if (!username || !password) {
    const error = new Error(errorType.USERNAME_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }

  // 判断用户名是没有被注册过的
  const dbRes = await service.getUserByName(username)
  if (dbRes[0].length) {
    const error = new Error(errorType.USERNAME_ALREADY_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }
  await next()
}

/**
 * DONE
 * @description: 事件: 处理密码
 * @params: {}
 * @return: undefined
 * @author: tutu
 * @time: 2023/7/24 13:59
 */
const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body
  ctx.request.body.password = md5Password(String(password))
  await next()
}

module.exports = {
  verifyUser, handlePassword
}
