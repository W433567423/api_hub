const Multer = require('koa-multer')
const avatarUpload = Multer({
  dest: './uploads/avatar'
})
const avatarHandler = avatarUpload.single('avatar')

// const saveFile = async (ctx: any, next: any) => {
//   console.log(ctx.request.body)
//   next()
// }
module.exports = { avatarHandler }
export {}
