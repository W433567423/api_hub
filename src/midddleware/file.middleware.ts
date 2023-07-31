const Multer = require('koa-multer')
const { AVATAR_PATH } = require('../constants/file_path')

const avatarUpload = Multer({
  dest: AVATAR_PATH
})
const avatarHandler = avatarUpload.single('avatar')

// const saveFile = async (ctx: any, next: any) => {
//   console.log(ctx.request.body)
//   next()
// }
module.exports = { avatarHandler }
export {}
