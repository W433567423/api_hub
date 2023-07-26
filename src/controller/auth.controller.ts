const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../app/config')

class AuthController {
  async login (ctx) {
    const { id, username } = ctx.user

    // 非对称加密生成token
    const token = jwt.sign({ id, username }, PRIVATE_KEY, {
      expiresIn: '15d',
      algorithm: 'RS256'
    })// RS256非对称加密(min:2048)、HS256固定密钥加密

    ctx.body = {
      id,
      username,
      token
    }
  }
}

module.exports = new AuthController()
export {}
