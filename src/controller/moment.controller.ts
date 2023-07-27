const errorType = require('../constants/error-types')

class MomentController {
  async publish (ctx) {
    // 获取用户数据
    const userId = ctx.user.id
    const content = ctx.request.body.content
    console.log(content, userId)
    if (!content) {
      const error = new Error(errorType.NO_CONTENT)
      return ctx.app.emit('error', error, ctx)
    }

    // 将数据保存到数据库
    ctx.body = {
      success: 'ok'
    }
  }
}

module.exports = new MomentController()
export {}
