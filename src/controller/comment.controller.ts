const errorType = require('../constants/error-types')
const CommentService = require('../service/comment.service')

class CommentController {
  /**
   * DONE
   * @description: 事件: 发布comment
   * @params: {}
   * @return: undefined
   * @author: tutu
   * @time: 2023/7/27 15:50
   */
  async publish (ctx) {
    const { momentId, content } = ctx.request.body
    const { id } = ctx.user
    if (!momentId || !content) {
      const error = new Error(errorType.NO_PARAMS)
      ctx.app.emit('error', error, ctx)
    }
    try {
      const dbRes = await CommentService.insertComment(id, momentId, content)
      // 获取用户数据
      ctx.body = { msg: '发表评论成功', data: dbRes }
    } catch (e) {
      const error = new Error(errorType.SQL_ERROR)
      ctx.app.emit('error', error, ctx)
    }
  }
}

module.exports = new CommentController()
export {}
