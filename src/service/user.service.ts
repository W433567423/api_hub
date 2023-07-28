import { type ILoginParams } from './type'

const db = require('../app/database')

class UserService {
  // 将注册用户保存到数据库
  async create (user: ILoginParams): Promise<void> {
    const { username, password } = user
    //   将user存储到数据库
    const sqlString = 'INSERT INTO user (username,password) VALUES(?,?);'
    await db.execute(sqlString, [username, password])
  }

  // 查询用户是否注册过
  async getUserByName (username) {
    const sqlString = 'SELECT * FROM user WHERE user.username =?;'
    return db.execute(sqlString, [username])
  }
}

module.exports = new UserService()
