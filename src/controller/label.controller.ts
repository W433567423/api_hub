const errorType = require('../constants/error-types')
const LabelService = require('../service/label.service')

class LabelController {
  /**
   * DONE
   * @description: 事件: 新增标签
   * @params: {}
   * @return: undefined
   * @author: tutu
   * @time: 2023/7/31 9:46
   */
  async newLabel (ctx: any) {
    const { title }: { title: string | undefined } = ctx.request.body
    if (!title) {
      const error = new Error(errorType.NO_PARAMS)
      return ctx.app.emit('error', error, ctx)
    }
    if (!await LabelService.isLabelExist) {
      try {
        await LabelService.newLabel(title)
      } catch {
        const error = new Error(errorType.SQL_ERROR)
        return ctx.app.emit('error', error, ctx)
      }
    }

    ctx.body = {
      msg: '新增标签成功'
    }
  }

  /**
   * DONE
   * @description: 事件: 获取所有标签列表
   * @params: {}
   * @return: undefined
   * @author: tutu
   * @time: 2023/7/31 9:46
   */
  async getLabelList (ctx: any) {
    try {
      ctx.body = { msg: 'success', data: await LabelService.getLabelList() }
    } catch {
      const error = new Error(errorType.SQL_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }
}

module.exports = new LabelController()
export {}
