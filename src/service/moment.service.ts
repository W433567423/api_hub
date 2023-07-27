const db = require('../app/database')

class MomentService {
  /**
   * DONE
   * @description: 事件: 插入数据到数据库
   * @params: {}
   * @return: undefined
   * @author: tutu
   * @time: 2023/7/27 15:19
   */

  async insertData (userId: string, content: string) {
    const sqlString = 'INSERT INTO moment (user_id,content) VALUES(?,?);'
    await db.execute(sqlString, [userId, content])
  }

  /**
   * DONE
   * @description: 事件: 插入数据到数据库
   * @params: {}
   * @return: undefined
   * @author: tutu
   * @time: 2023/7/27 15:19
   */

  async getMomentDetailById (momentId: number) {
    const sqlString = `
      SELECT m.id      AS                                        id,
             m.content AS                                        content,
             m.createAt                                          createTime,
             m.updateAt                                          updateTime,
             JSON_OBJECT('userId', u.id, 'username', u.username) user
      FROM moment m
             LEFT JOIN user u ON m.user_id = u.id
      WHERE m.id = ?;
    `
    return (await db.execute(sqlString, [momentId]))[0][0]
  }

  /**
   * DONE
   * @description: 事件: 插入数据到数据库
   * @params: {}
   * @return: undefined
   * @author: tutu
   * @time: 2023/7/27 15:19
   */

  async getMomentDetailByIds (page: number, limit: number) {
    const sqlString = `
      SELECT m.id      AS                                        id,
             m.content AS                                        content,
             m.createAt                                          createTime,
             m.updateAt                                          updateTime,
             JSON_OBJECT('userId', u.id, 'username', u.username) USER
      FROM moment m
             LEFT JOIN USER u ON m.user_id = u.id
      LIMIT ${page}, ${limit};
    `
    return (await db.execute(sqlString))[0]
  }
}

module.exports = new MomentService()
export {}
