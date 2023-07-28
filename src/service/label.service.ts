const db = require('../app/database')

class LabelService {
  // 新增标签
  async newLabel (title: string) {
    const sqlString = `
      INSERT INTO label
      SET title = ?;`
    await db.execute(sqlString, [title])
  }

  // 给moment添加多个标签
  async addLabelsToMomentId (labels: string[]) {
    const sqlString = `${labels}`
    await db.execute(sqlString)
  }
}

module.exports = new LabelService()
export {}
