const db = require('../app/database')

class CommentService {
  /**
   * DONE
   * @description: 事件: 插入数据到数据库
   * @params: {}
   * @return: undefined
   * @author: tutu
   * @time: 2023/7/27 15:19
   */

  async insertComment (userId: string, momentId: string, content: string, commentId?: string) {
    if (commentId) {
      const sqlString = 'INSERT INTO comment (user_id,moment_id,comment_id,content) VALUES( ?, ?, ?, ?);'
      return (await db.execute(sqlString, [userId, momentId, commentId, content]))[0]
    } else {
      const sqlString = 'INSERT INTO comment (user_id,moment_id,content) VALUES( ?, ?, ?);'
      return (await db.execute(sqlString, [userId, momentId, content]))[0]
    }
  }
}

module.exports = new CommentService()
export {}
