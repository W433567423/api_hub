class AuthController {
  async login (ctx) {
    const { username } = ctx.request.body
    ctx.body = `登陆成功,欢迎${username}`
  }
}

module.exports = new AuthController()
