const errorTypes = require('../constants/error-types')

/**
 * DONE
 * @description: 事件: 全局错误处理函数
 * @params: {}
 * @return: undefined
 * @author: tutu
 * @time: 2023/7/24 10:14
 */
const errorHandle = (error, ctx) => {
  let status: number
  let message: string
  switch (error.message) {
    // 用户名或密码为空
    case errorTypes.NAME_PASSWORD_IS_REQUIRED:
      status = 400
      message = 'username or password is undefined'
      break
    // 用户名已经被使用
    case errorTypes.NAME_ALREADY_EXISTS:
      status = 409
      message = 'name is used'
      break
    default:
      status = 404
      message = '未知错误'
      break
  }
  ctx.status = status
  ctx.body = { msg: message }
}

module.exports = { errorHandle }
