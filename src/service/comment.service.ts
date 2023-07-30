const db = require('../app/database')

class CommentService {
  // 插入数据到数据库
  async insertComment (userId: number, momentId: number, content: string, commentId?: number) {
    if (commentId) {
      const sqlString = 'INSERT INTO comment (user_id,moment_id,comment_id,content) VALUES( ?, ?, ?, ?);'
      return (await db.execute(sqlString, [userId, momentId, commentId, content]))[0]
    } else {
      const sqlString = 'INSERT INTO comment (user_id,moment_id,content) VALUES( ?, ?, ?);'
      return (await db.execute(sqlString, [userId, momentId, content]))[0]
    }
  }

  // 修改comment by id and userId
  async getCommentByIdAndUserId (userId: number, commentId: number) {
    const sqlString = `SELECT *
                           FROM comment
                           WHERE comment.id = ?
                             AND comment.user_id = ?;
        `
    const dbRes = await db.execute(sqlString, [commentId, userId])
    return !!dbRes[0][0]
  }

  // 修改comment by id
  async changeCommentById (commentId: number, content: string) {
    console.log(content, commentId)
    const sqlString = 'UPDATE  comment SET content = ? WHERE id = ?;'
    return (await db.execute(sqlString, [content, commentId]))[0]
  }

  // 删除comment by id
  async delCommentById (commentId: number) {
    const sqlString = `DELETE
                           FROM comment
                           WHERE comment.id = ?;
        `
    await db.execute(sqlString, [commentId])
  }

  // 获得comments by momentId
  async getCommentsByMomentId (momentId: number) {
    const sqlString = `
            SELECT c.id,
                   c.content,
                   c.comment_id,
                   c.createAt                                  createTime,
                   JSON_OBJECT('id', u.id, 'name', u.username) publishAuthor
            FROM comment c
                     LEFT JOIN user u ON u.id = c.user_id
            WHERE c.moment_id = ?;
        `
    return (await db.execute(sqlString, [momentId]))[0]
  }
}

module.exports = new CommentService()
export {}
