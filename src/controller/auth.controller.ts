class AuthController {
  async login (ctx) {
    const { username } = ctx.request.request.body
    console.log(username)
  }
}

module.exports = new AuthController()
