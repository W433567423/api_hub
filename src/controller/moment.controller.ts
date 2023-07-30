import type { ILabelWMoment } from '../service/type'

const errorType = require('../constants/error-types')
const MomentService = require('../service/moment.service')

class MomentController {
  /**
     * DONE
     * @description: 事件: 发布moment 详情
     * @params: {}
     * @return: undefined
     * @author: tutu
     * @time: 2023/7/27 15:50
     */
  async publish (ctx) {
    // 获取用户数据
    const userId: number = ctx.user.id
    const content: string | undefined = ctx.request.body.content
    if (!content) {
      const error = new Error(errorType.NO_PARAMS)
      return ctx.app.emit('error', error, ctx)
    }

    // 将数据保存到数据库
    try {
      await MomentService.insertData(userId, content)
    } catch {
      const error = new Error(errorType.SQL_ERROR)
      return ctx.app.emit('error', error, ctx)
    }

    ctx.body = {
      success: '发布成功'
    }
  }

  /**
     * DONE
     * @description: 事件: 通过momentId获得moment 详情
     * @params: {}
     * @return: undefined
     * @author: tutu
     * @time: 2023/7/27 15:52
     */
  async getMomentDetailById (ctx) {
    const { momentId }: { momentId: number | undefined } = ctx.params
    if (!momentId) {
      const error = new Error(errorType.NO_PARAMS)
      return ctx.app.emit('error', error, ctx)
    }
    try {
      ctx.body = { msg: await MomentService.getMomentDetailById(momentId) }
    } catch {
      const error = new Error(errorType.SQL_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  /**
     * DONE
     * @description: 事件: 通过momentId获得moment列表
     * @params: {}
     * @return: undefined
     * @author: tutu
     * @time: 2023/7/27 16:29
     */
  async getMomentDetailByIds (ctx) {
    const { limit, page }: { limit: string | undefined, page: string | undefined } = ctx.request.query
    if (!limit || !page) {
      const error = new Error(errorType.NO_PARAMS)
      return ctx.app.emit('error', error, ctx)
    }
    try {
      ctx.body = { msg: await MomentService.getMomentDetailByIds(Number(page), Number(limit)) }
    } catch {
      const error = new Error(errorType.SQL_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  /**
     * DONE
     * @description: 事件: 修改moment by id
     * @params: {}
     * @return: undefined
     * @author: tutu
     * @time: 2023/7/27 17:35
     */
  async changeMomentById (ctx) {
    const { momentId }: { momentId: number } = ctx.request.params
    const { content }: { content: string | undefined } = ctx.request.body
    if (!content) {
      const error = new Error(errorType.NO_PARAMS)
      return ctx.app.emit('error', error, ctx)
    }

    const data = await MomentService.updateMomentByIdAndUserId(ctx.user.id, momentId, content)

    ctx.body = {
      msg: '更新moment成功', data
    }
  }

  /**
     * DONE
     * @description: 事件: 某用户删除他的moment by id
     * @params: {}
     * @return: undefined
     * @author: tutu
     * @time: 2023/7/27 17:07
     */
  async delMomentById (ctx) {
    // 删除
    const { momentId }: { momentId: number | undefined } = ctx.request.params
    if (!momentId) {
      const error = new Error(errorType.NO_PARAMS)
      return ctx.app.emit('error', error, ctx)
    }
    await MomentService.delMomentById(momentId)

    ctx.body = {
      msg: '删除成功'
    }
  }

  /**
     * DONE
     * @description: 事件: 给moment新增标签
     * @params: {}
     * @return: undefined
     * @author: tutu
     * @time: 2023/7/28 17:19
     */
  async addLabels (ctx) {
    const { labels }: { labels: ILabelWMoment [] } = ctx
    const { momentId }: { momentId: number } = ctx.params
    // await MomentService.linkMomentWithLabel(momentId, labels)
    const addLabels: ILabelWMoment[] = []
    try {
      for (const label of labels) {
        const flag = Boolean(await MomentService.isLinkMomentWithLabel(momentId, label))
        // tag是否已经关联moment
        if (!flag) {
          addLabels.push(label)
          await MomentService.linkMomentWithLabel(momentId, label)
        }
      }
    } catch {
      const error = new Error(errorType.SQL_ERROR)
      return ctx.app.emit('error', error, ctx)
    }

    ctx.body = { msg: `新增标签<${(addLabels.map(item => item.title).join(','))}>成功,其余标签已存在` }
  }
}

module.exports = new MomentController()
export {}
