class AuthController {
  async login (ctx) {
    const { username } = ctx.request.body
    ctx.body = {
      msg: `登陆成功,欢迎${username}`
    }
  }
}

module.exports = new AuthController()
