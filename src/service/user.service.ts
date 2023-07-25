import { type ILoginParams } from './type'

const db = require('../app/database')

class UserService {
  /**
   * DONE
   * @description: 事件: 将注册用户保存到数据库
   * @params: {}
   * @return: undefined
   * @author: tutu
   * @time: 2023/7/24 12:13
   */
  async create (user: ILoginParams): Promise<string> {
    const { username, password } = user
    //   将user存储到数据库
    const sqlString = 'INSERT INTO users (name,password) VALUES(?,?);'
    const dbRes = await db.execute(sqlString, [username, password])
    console.log(dbRes)
    return 'tutu'
  }

  /**
   * DONE
   * @description: 事件: 查询用户是否注册过
   * @params: {}
   * @return: undefined
   * @author: tutu
   * @time: 2023/7/24 12:13
   */
  async getUserByName (username) {
    const sqlString = 'SELECT * FROM users WHERE users.name =?;'
    return db.execute(sqlString, [username])
  }
}

module.exports = new UserService()
