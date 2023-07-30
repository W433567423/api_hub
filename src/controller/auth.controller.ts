import { type IUser } from '../service/type'

const jwt = require('jsonwebtoken')

const { PRIVATE_KEY, PUBLIC_KEY } = require('../app/config')

class AuthController {
  async login (ctx: any) {
    const { id, username } = ctx.user as IUser
    // 非对称加密生成token
    const token = jwt.sign({ id, username }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24 * 7,
      algorithm: 'RS256'
    })// RS256非对称加密(min:2048)、HS256对拆加密(固定密钥)加密
    console.log('尝试解密\n')
    console.log(jwt.verify(token, PUBLIC_KEY, { algorithms: ['RS256'] }))
    ctx.body = {
      id,
      username,
      token
    }
  }
}

module.exports = new AuthController()
export {}
