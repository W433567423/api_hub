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

module.exports = { avatarHandler, photosHandler }
export {}
