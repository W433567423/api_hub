// const errorType = require('../constants/error-types')
const LabelService = require('../service/label.service')

const isExistLabels = async (ctx, next) => {
  const { labels } = ctx.request.body
  for (const label of labels) {
    const isExist = await LabelService.isLabelExist(String(label))
    if (!isExist) {
      console.log(
        await LabelService.newLabel(String(label)))
    }
  }
  await next()
}

module.exports = { isExistLabels }
export {}
