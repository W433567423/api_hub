const db = require('../app/database')

class LabelService {
  // 新增标签
  async newLabel (label: string) {
    const sqlString = `
            INSERT INTO label
            SET title = ?;`
    return (await db.execute(sqlString, [label]))[0]?.insertId
  }

  // 标签是否存在
  async isLabelExist (label: string) {
    const sqlString = `
            SELECT *
            FROM label
            WHERE title = ?;`
    return !!((await db.execute(sqlString, [label]))[0].length)
  }

  async getLabelByTitle (label: string) {
    const sqlString = `
            SELECT *
            FROM label
            WHERE title = ?;`
    return (await db.execute(sqlString, [label]))[0][0]
  }

  // 给moment添加多个标签
  async addLabelsToMomentId (labels: string[]) {
    const sqlString = `${labels}`
    await db.execute(sqlString)
  }
}

module.exports = new LabelService()
export {}
