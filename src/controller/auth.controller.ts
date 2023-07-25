class AuthController {
  async login (ctx) {
    const { username } = ctx.request.body
    console.log(9)
    ctx.body = `登陆成功,欢迎${username}`
  }
}

module.exports = new AuthController()
