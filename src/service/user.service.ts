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

  // 查询用户
  async getUserByName (username) {
    const sqlString = 'SELECT * FROM user WHERE user.username =?;'
    return db.execute(sqlString, [username])
  }

  // 给用户添加头像
  async setAvatarUrl (url: string, userId: number) {
    const sqlString = 'UPDATE user SET avatar_url = ? WHERE id = ?'
    return db.execute(sqlString, [url, userId])
  }
}

module.exports = new UserService()
