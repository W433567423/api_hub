import { type ILoginParams } from './type'

const db = require('../app/database')

class UserService {
  async create (user: ILoginParams): Promise<string> {
    const { name, password } = user
    //   将user存储到数据库
    const sqlString = 'INSERT INTO users (name,password) VALUES(?,?);'
    const dbRes = await db.execute(sqlString, [name, password])
    console.log(dbRes)
    return 'tutu'
  }
}

module.exports = new UserService()
