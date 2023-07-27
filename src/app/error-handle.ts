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
  console.log('进入错误处理', error.message)
  switch (error.message) {
    // 用户名或密码为空
    case errorTypes.USERNAME_PASSWORD_IS_REQUIRED:
      status = 400
      message = 'username or password is undefined'
      break
    // 用户名已经被使用
    case errorTypes.USERNAME_ALREADY_EXISTS:
      status = 409
      message = '用户名已被注册'
      break
    // 用户不存在
    case errorTypes.USERNAME_NOT_EXISTS:
      status = 400
      message = '用户名不存在'
      break
    // 用户不存在
    case errorTypes.PASSWORD_ERROR:
      status = 400
      message = '密码错误'
      break
    // token不存在
    case errorTypes.NO_TOKEN:
      status = 401
      message = '未登录'
      break
    // token不存在
    case errorTypes.NO_PARAMS:
      status = 400
      message = '参数缺失'
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
