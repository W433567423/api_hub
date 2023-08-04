import { type IUser } from '../service/type'

const jwt = require('jsonwebtoken')

const { PRIVATE_KEY, PUBLIC_KEY } = require('../app/config')

class AuthController {
  /**
   * @openapi
   * /login:
   *   post:
   *     description: 用户登入
   *     tags: [用户系统]
   *     produces:
   *       - application/json
   *     parameters:
   *       - name: username
   *         description: 用户名.
   *         in: formData
   *         required: true
   *         type: string
   *       - name: password
   *         description: 用户密码.
   *         in: formData
   *         required: true
   *         type: string
   *     responses:
   *       200:
   *         description: 登入成功
   *         schema:
   *           type: object
   *           id: number
   *           username: string
   *           token: string
   *
   */
  async login (ctx: any) {
    console.log(ctx.request)
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
