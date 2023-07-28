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

  /**
   * DONE
   * @description: 事件: 回复conment的comment 发布
   * @params: {}
   * @return: undefined
   * @author: tutu
   * @time: 2023/7/28 10:05
   */
  async reply (ctx) {
    const { momentId, commentId, content } = ctx.request.body
    const { id } = ctx.user
    if (!momentId || !content) {
      const error = new Error(errorType.NO_PARAMS)
      ctx.app.emit('error', error, ctx)
    }
    try {
      const dbRes = await CommentService.insertComment(id, momentId, content, commentId)
      // 获取用户数据
      ctx.body = { msg: '回复评论成功', data: dbRes }
    } catch (e) {
      const error = new Error(errorType.SQL_ERROR)
      ctx.app.emit('error', error, ctx)
    }
  }

  /**
   * DONE
   * @description: 事件: 修改comment by id
   * @params: {}
   * @return: undefined
   * @author: tutu
   * @time: 2023/7/28 10:21
   */
  async changeCommentById (ctx) {
    const { commentId } = ctx.params
    const { content } = ctx.request.body
    if (!content) {
      const error = new Error(errorType.NO_PARAMS)
      ctx.app.emit('error', error, ctx)
    }
    try {
      const dbRes = await CommentService.changeCommentbyId(commentId, content)
      // 获取用户数据
      ctx.body = { msg: '修改comment成功', data: dbRes }
    } catch (e) {
      const error = new Error(errorType.SQL_ERROR)
      ctx.app.emit('error', error, ctx)
    }
  }

  /**
   * DONE
   * @description: 事件: 用户删除其comment by id
   * @params: {}
   * @return: undefined
   * @author: tutu
   * @time: 2023/7/28 10:54
   */
  async deleteCommentById (ctx) {
    const { commentId } = ctx.params
    try {
      const dbRes = await CommentService.delCommentById(commentId)
      // 获取用户数据
      ctx.body = { msg: '删除comment成功', data: dbRes }
    } catch (e) {
      const error = new Error(errorType.SQL_ERROR)
      ctx.app.emit('error', error, ctx)
    }
  }
}

module.exports = new CommentController()
export {}
