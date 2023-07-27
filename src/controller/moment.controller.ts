const errorType = require('../constants/error-types')
const MomentService = require('../service/moment.service')

class MomentController {
  /**
   * DONE
   * @description: 事件: 发布moment
   * @params: {}
   * @return: undefined
   * @author: tutu
   * @time: 2023/7/27 15:50
   */
  async publish (ctx) {
    // 获取用户数据
    const userId = ctx.user.id
    const content = ctx.request.body.content
    if (!content) {
      const error = new Error(errorType.NO_CONTENT)
      return ctx.app.emit('error', error, ctx)
    }

    // 将数据保存到数据库
    try {
      await MomentService.insertData(userId, content)
    } catch (e) {
      const error = new Error(errorType.SQL_ERROR)
      return ctx.app.emit('error', error, ctx)
    }

    ctx.body = {
      success: '发布成功'
    }
  }
}

module.exports = new MomentController()
export {}
