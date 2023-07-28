const db = require('../app/database')

class MomentService {
  // 插入数据到数据库
  async insertData (userId: string, content: string) {
    const sqlString = 'INSERT INTO moment (user_id,content) VALUES(?,?);'
    await db.execute(sqlString, [userId, content])
  }

  // 插入数据到数据库
  async getMomentDetailById (momentId: number) {
    const sqlString = `
      SELECT m.id      AS                                        id,
             m.content AS                                        content,
             m.createAt                                          createTime,
             m.updateAt                                          updateTime,
             JSON_OBJECT('userId', u.id, 'username', u.username) author,
             JSON_ARRAYAGG(
               JSON_OBJECT('id', c.id, 'content', c.content, 'createTime', c.createAt, 'commentUser',
                           JSON_OBJECT('userId', cu.id, 'username', cu.username))
               )                                                 comments

      FROM moment m
             LEFT JOIN user u ON m.user_id = u.id
             LEFT JOIN comment c ON c.moment_id = m.id
             LEFT JOIN user cu ON cu.id = c.user_id
      WHERE m.id = ${momentId};
    `
    return (await db.execute(sqlString))[0][0]
  }

  // 获取moment列表
  async getMomentDetailByIds (page: number, limit: number) {
    const sqlString = `
      SELECT m.id      AS                                              id,
             m.content AS                                              content,
             m.createAt                                                createTime,
             m.updateAt                                                updateTime,
             (SELECT COUNT(*) from comment c where c.moment_id = m.id) commentCount,
             JSON_OBJECT('userId', u.id, 'username', u.username)       user
      FROM moment m
             LEFT JOIN user u ON m.user_id = u.id
      LIMIT ${page}, ${limit};
    `
    return (await db.execute(sqlString))[0]
  }

  // 获取到moment详情 by momentId and userId
  async getMomentByIdAndUserId (momentId: number, userId: number) {
    const sqlString = `SELECT *
                       FROM moment
                       WHERE moment.id = ?
                         AND moment.user_id = ?;
    `
    const dbRes = await db.execute(sqlString, [momentId, userId])
    return !!dbRes[0][0]
  }

  // 删除moment by id
  async delMomentById (momentId: number) {
    const sqlString = `DELETE
                       FROM moment
                       WHERE moment.id = ?;
    `
    await db.execute(sqlString, [momentId])
  }

  // 修改moment by momentId
  async updateMomentByIdAndUserId (userId: number, momentId: number, content: string) {
    const sqlString = 'UPDATE moment SET content = ? WHERE id = ? AND user_id = ?;'
    return (await db.execute(sqlString, [content, momentId, userId]))[0]
  }
}

module.exports = new MomentService()
export {}
