import { type IUser } from '../service/type'

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
  async publish (ctx: any) {
    const { momentId, content }: { momentId: number | undefined, content: string | undefined } = ctx.request.body
    const { id } = ctx.user as IUser
    if (!momentId || !content) {
      const error = new Error(errorType.NO_PARAMS)
      ctx.app.emit('error', error, ctx)
    }
    try {
      const dbRes = await CommentService.insertComment(id, momentId as number, content as string)
      // 获取用户数据
      ctx.body = { msg: '发表评论成功', data: dbRes }
    } catch (e) {
      const error = new Error(errorType.SQL_ERROR)
      ctx.app.emit('error', error, ctx)
    }
  }

  /**
     * DONE
     * @description: 事件: 回复comment的comment 发布
     * @params: {}
     * @return: undefined
     * @author: tutu
     * @time: 2023/7/28 10:05
     */
  async reply (ctx: any) {
    const { momentId, commentId, content }: { momentId: number | undefined, content: string | undefined, commentId: number | undefined } = ctx.request.body
    const { id } = ctx.user as IUser
    if (!momentId || !content) {
      const error = new Error(errorType.NO_PARAMS)
      ctx.app.emit('error', error, ctx)
    }
    try {
      const dbRes = await CommentService.insertComment(id, momentId as number, content as string, commentId as number)
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
  async changeCommentById (ctx: any) {
    const { commentId }: { commentId: number | undefined } = ctx.params
    const { content }: { content: string | undefined } = ctx.request.body
    if (!content) {
      const error = new Error(errorType.NO_PARAMS)
      ctx.app.emit('error', error, ctx)
    }
    try {
      const dbRes = await CommentService.changeCommentById(commentId as number, content as string)
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
  async deleteCommentById (ctx: any) {
    const { commentId }: { commentId: number | undefined } = ctx.params
    try {
      const dbRes = await CommentService.delCommentById(commentId as number)
      // 获取用户数据
      ctx.body = { msg: '删除comment成功', data: dbRes }
    } catch (e) {
      const error = new Error(errorType.SQL_ERROR)
      ctx.app.emit('error', error, ctx)
    }
  }

  /**
     * DONE
     * @description: 事件: 获取Comments by id
     * @params: {}
     * @return: undefined
     * @author: tutu
     * @time: 2023/7/28 16:14
     */
  async getCommentsById (ctx: any) {
    const { momentId }: { momentId: number | undefined } = ctx.params
    if (!momentId) {
      const error = new Error(errorType.NO_PARAMS)
      ctx.app.emit('error', error, ctx)
    }
    ctx.body = { msg: '查询comments成功', data: await CommentService.getCommentsByMomentId(momentId as number) }
  }
}

module.exports = new CommentController()
export {}
