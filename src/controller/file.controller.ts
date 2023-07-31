import { type IUser } from '../service/type'

const errorType = require('../constants/error-types')
const FileService = require('../service/file.service')
const UserService = require('../service/user.service')
const { uploadFile } = require('../utils')
const fs = require('fs')
const { AVATAR_PATH } = require('../constants/file_path')

class FileController {
  /**
   * DONE
   * @description: 事件:保存用户头像
   * @params: {}
   * @return: undefined
   * @author: tutu
   * @time: 2023/7/31 13:49
   */
  async saveAvatarInfo (ctx: any) {
    let msg = ''
    const { id: userId, username } = ctx.user as IUser
    const { path, mimetype, size, filename } = ctx.req.file
    const cosRes = await uploadFile({ Key: `hub/avatar/${username}-avatar.png`, FilePath: path })
    try {
      const isExistsAvatar = await FileService.isExistsAvatarLink(userId)
      if (isExistsAvatar) {
        // update
        msg = '头像更新成功'
        await FileService.setAvatarLink(cosRes.Location, mimetype, size as string + 'bit', filename, userId, 'update')
      } else {
        msg = '头像上传成功'
        await FileService.setAvatarLink(cosRes.Location, mimetype, size as string + 'bit', filename, userId, 'new')
      }
      await UserService.setAvatarUrl(cosRes.Location, userId)
    } catch {
      const error = new Error(errorType.SQL_ERROR)
      ctx.app.emit('error', error, ctx)
    }
    ctx.body = { msg, data: { url: cosRes.Location } }
  }

  /**
   * DONE
   * @description: 事件: get 用户头像 by useId
   * @params: {}
   * @return: undefined
   * @author: tutu
   * @time: 2023/7/31 13:50
   */
  async getAvatarInfo (ctx: any) {
    const { userId }: { userId: string | undefined } = ctx.params
    if (!userId) {
      const error = new Error(errorType.NO_PARAMS)
      ctx.app.emit('error', error, ctx)
    }
    const { filename, mimetype } = await FileService.getAvatarByUserId(Number(userId))
    ctx.response.set('content-type', mimetype)
    ctx.body = fs.createReadStream(`${AVATAR_PATH}${filename}`)
  }
}

module.exports = new FileController()
