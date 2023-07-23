class UserService {
  async create (user: any): Promise<string> {
    console.log(user)
    //   将user存储到数据库
    return 'tutu'
  }
}

module.exports = new UserService()
