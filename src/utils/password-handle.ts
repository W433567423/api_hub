const crypto = require('crypto')

/**
 * DONE
 * @description: 事件: md5加密密码
 * @params: {}
 * @return: undefined
 * @author: tutu
 * @time: 2023/7/24 13:58
 */
const md5Password = (password) => {
  console.log('md5Password')
  const md5 = crypto.createHash('md5')
  return md5.update(password).digest('hex')
}

module.exports = { md5Password }
export {}
