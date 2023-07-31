import { type ICosConfig } from './type'

const cos = require('../app/cos')
const {
  COS_BUCKET_NAME,
  COS_BUCKET_REGION
} = require('../app/config')
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

/**
 * DONE
 * @description: 事件:
 * @params: {}
 * @return: undefined
 * @author: tutu
 * @time: 2023/7/31 11:33
 */
const uploadFile = async (config: ICosConfig) => {
  return await new Promise((resolve, reject) => {
    cos.uploadFile({
      Bucket: COS_BUCKET_NAME, /* 填入您自己的存储桶，必须字段 */
      Region: COS_BUCKET_REGION, /* 存储桶所在地域，例如 ap-beijing，必须字段 */
      ...config,
      SliceSize: 1024 * 1024 * 5 /* 触发分块上传的阈值，超过5MB使用分块上传，非必须 */
    }, (err, data) => {
      if (err) reject(err)
      else resolve(data)
    })
  })
}

module.exports = { md5Password, uploadFile }
export {}
