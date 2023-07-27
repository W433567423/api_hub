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
   * @description: 事件: 通过momentId获得moment
   * @params: {}
   * @return: undefined
   * @author: tutu
   * @time: 2023/7/27 15:52
   */
  async getMomentDetailById (ctx) {
    if (!ctx.params.momentId) {
      const error = new Error(errorType.NO_PARAMS)
      return ctx.app.emit('error', error, ctx)
    }
    try {
      ctx.body = { msg: await MomentService.getMomentDetailById(Number(ctx.params.momentId)) }
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
    const { limit, page } = ctx.request.query
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
   * @description: 事件: 某用户删除他的moment by id
   * @params: {}
   * @return: undefined
   * @author: tutu
   * @time: 2023/7/27 17:07
   */
  async delMomentById (ctx) {
    // 取参
    const userId = ctx.user.id
    const momentId = ctx.request.body.momentId
    if (!momentId) {
      const error = new Error(errorType.NO_PARAMS)
      return ctx.app.emit('error', error, ctx)
    }
    // 拿到该动态
    const momentDetail = await MomentService.getMomentDetailById(momentId)
    if (!momentDetail) {
      const error = new Error(errorType.NO_MOMENT)
      return ctx.app.emit('error', error, ctx)
    }

    // 校验删除者是否为动态发布着
    if (momentDetail?.user?.userId !== userId) {
      const error = new Error(errorType.NO_PERMISSION)
      return ctx.app.emit('error', error, ctx)
    }
    // 删除
    await MomentService.delMomentById(momentId)

    ctx.body = {
      msg: '删除成功'
    }
  }
}

module.exports = new MomentController()
export {}
