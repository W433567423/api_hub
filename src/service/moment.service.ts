const db = require('../app/database')

const sqlFragament = `
  SELECT m.id      AS                                        id,
         m.content AS                                        content,
         m.createAt                                          createTime,
         m.updateAt                                          updateTime,
         JSON_OBJECT('userId', u.id, 'username', u.username) user
  FROM moment m
         LEFT JOIN user u ON m.user_id = u.id`

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
    const sqlString = `${sqlFragament}
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
    const sqlString = `${sqlFragament}
      LIMIT ${page}, ${limit};
    `
    return (await db.execute(sqlString))[0]
  }

  /**
   * DONE
   * @description: 事件: 删除moment by id
   * @params: {}
   * @return: undefined
   * @author: tutu
   * @time: 2023/7/27 17:21
   */
  async delMomentById (momentId: number) {
    const sqlString = `DELETE
                       FROM moment
                       WHERE moment.id = ?;
    `
    await db.execute(sqlString, [momentId])
  }
}

module.exports = new MomentService()
export {}
