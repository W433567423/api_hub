const errorType = require('../constants/error-types')
const LabelService = require('../service/label.service')

class LabelController {
  async newLabel (ctx: any) {
    const { title }: { title: string | undefined } = ctx.request.body
    if (!title) {
      const error = new Error(errorType.NO_PARAMS)
      return ctx.app.emit('error', error, ctx)
    }
    if (!await LabelService.isLabelExist) {
      await LabelService.newLabel(title)
    }

    ctx.body = {
      msg: '新增标签成功'
    }
  }
}

module.exports = new LabelController()
export {}
