const db = require('../app/database')

class LabelService {
  async newLabel (title: string) {
    const sqlString = `
      INSERT INTO label
      SET title = ?;`
    await db.execute(sqlString, [title])
  }
}

module.exports = new LabelService()
export {}
