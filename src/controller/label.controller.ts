const errorType = require('../constants/error-types')
const LabelService = require('../service/label.service')

class LabelController {
  async newLabel (ctx) {
    const { title } = ctx.request.body
    if (!title) {
      const error = new Error(errorType.NO_PARAMS)
      return ctx.app.emit('error', error, ctx)
    }
    await LabelService.newLabel(title)

    ctx.body = {
      msg: '新增标签成功'
    }
  }
}

module.exports = new LabelController()
export {}
