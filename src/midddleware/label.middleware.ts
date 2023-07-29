// const errorType = require('../constants/error-types')
const LabelService = require('../service/label.service')

const isExistLabels = async (ctx, next) => {
  const { labels } = ctx.request.body
  const tags: any[] = []
  for (const item of labels) {
    const dbRes = await LabelService.getLabelByTitle(String(item))
    if (!dbRes) {
      const insertId = await LabelService.newLabel(String(item))
      const tag = { id: insertId, title: item }
      tags.push(tag)
    } else {
      const { id, title } = dbRes
      tags.push({ id, title })
    }
  }
  console.log('\n', tags)
  await next()
}

module.exports = { isExistLabels }
export {}
