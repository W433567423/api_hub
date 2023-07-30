import { type ILabelWMoment } from '../service/type'

const errorType = require('../constants/error-types')
const LabelService = require('../service/label.service')

const isExistLabels = async (ctx: any, next: any) => {
  const { labels }: { labels: string[] | undefined } = ctx.request.body
  if (!labels) {
    const error = new Error(errorType.NO_PARAMS)
    return ctx.app.emit('error', error, ctx)
  }
  const tags: ILabelWMoment[] = []
  for (const item of labels) {
    const dbRes = await LabelService.getLabelByTitle(String(item))
    if (!dbRes) {
      const insertId = (await LabelService.newLabel(String(item))) as number
      const tag = { id: insertId, title: item }
      tags.push(tag)
    } else {
      const { id, title } = dbRes
      tags.push({ id, title })
    }
  }
  ctx.labels = tags
  await next()
}

module.exports = { isExistLabels }
export {}
