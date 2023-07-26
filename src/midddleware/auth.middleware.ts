const errorType = require('../constants/error-types')
const userService = require('../service/user.service')
const md5Password = require('../utils/password-handle')

const varifyLogin = async (ctx, next) => {
  // 获取用户名密码
  const { username, password } = ctx.request.body

  // 判断用户名密码为空
  if (!username || !password) {
    const error = new Error(errorType.USERNAME_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }

  // 判断用户名是否存在
  const dbRes = await userService.getUserByName(username)
  if (!dbRes[0].length) {
    const error = new Error(errorType.USERNAME_NOT_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }

  // 判断密码和数据库中是否一致(加密)
  if (md5Password(password) !== dbRes[0][0].password) {
    const error = new Error(errorType.PASSWORD_ERROR)
    return ctx.app.emit('error', error, ctx)
  }

  await next()
}

module.exports = { varifyLogin }
export {}
