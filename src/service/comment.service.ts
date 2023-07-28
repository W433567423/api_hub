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

  async getCommentByIdAndUserId (userId: string, commentId: string) {
    const sqlString = `SELECT *
                       FROM comment
                       WHERE comment.id = ?
                         AND comment.user_id = ?;
    `
    const dbRes = await db.execute(sqlString, [commentId, userId])
    return !!dbRes[0][0]
  }

  async changeComment (commentId: string, content: string) {
    console.log(content, commentId)
    const sqlString = 'UPDATE  comment SET content = ? WHERE id = ?;'
    return (await db.execute(sqlString, [content, commentId]))[0]
  }
}

module.exports = new CommentService()
export {}
