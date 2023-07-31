import { type IUser } from '../service/type'

const errorType = require('../constants/error-types')
const FileService = require('../service/file.service')
const { uploadFile } = require('../utils')
const fs = require('fs')

class FileController {
  async saveAvatarInfo (ctx: any) {
    const { id: userId } = ctx.user as IUser
    const { path, mimetype, size } = ctx.req.file
    const { username } = ctx.user as IUser
    const cosRes = await uploadFile({ Key: `${username}-avatar.png`, FilePath: path })
    try {
      const isExistsAvatar = await FileService.isExistsAvatarLink(userId)
      if (isExistsAvatar) {
        // update
        await FileService.setAvatarLink(cosRes.Location, mimetype, size as string + 'bit', userId, 'update')
      } else {
        await FileService.setAvatarLink(cosRes.Location, mimetype, size as string + 'bit', userId, 'new')
      }
    } catch {
      const error = new Error(errorType.NO_PARAMS)
      ctx.app.emit('error', error, ctx)
    }
    fs.unlinkSync(path)
    ctx.body = { msg: '头像更新成功成功' }
  }
}

module.exports = new FileController()
