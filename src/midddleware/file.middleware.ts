// const Jimp = require('jimp')
const Multer = require('koa-multer')
const { AVATAR_PATH, PICTURE_PATH } = require('../constants/file_path')

const avatarUpload = Multer({
  dest: AVATAR_PATH
})
const avatarHandler = avatarUpload.single('avatar')

const photoUpload = Multer({
  dest: PICTURE_PATH
})
const photosHandler = photoUpload.array('pictures', 12)

const photosResize = async (ctx: any, next: any) => {
  // const files: IMulterFileObj[] = ctx.req.files

  // 图像处理
  // for (const file of files) {
  // Jimp.read(file.path).then(image => image.resize(1280, Jimp.AUTO).write(file.path + '-large'))
  // Jimp.read(file.path).then(image => image.resize(640, Jimp.AUTO).write(file.path + '-middle'))
  // Jimp.read(file.path).then(image => image.resize(320, Jimp.AUTO).write(file.path + '-small'))
  // }
  await next()
}

module.exports = { avatarHandler, photosHandler, photosResize }
export {}
