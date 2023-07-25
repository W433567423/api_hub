const { createHash } = require('crypto')

/**
 * DONE
 * @description: 事件: md5加密密码
 * @params: {}
 * @return: undefined
 * @author: tutu
 * @time: 2023/7/24 13:58
 */
const md5Password = (password: string) => {
  // 仅能对字符串进行加密
  return createHash('md5').update(password).digest('hex')
}

module.exports = md5Password
export {}
