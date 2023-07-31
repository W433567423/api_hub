const COS = require('cos-nodejs-sdk-v5')
const { COS_SECRET_ID, COS_SECRET_KEY } = require('./config')

const cos = new COS({
  SecretId: COS_SECRET_ID, // 推荐使用环境变量获取；用户的 SecretId，建议使用子账号密钥，授权遵循最小权限指引，降低使用风险。子账号密钥获取可参考https://cloud.tencent.com/document/product/598/37140
  SecretKey: COS_SECRET_KEY // 推荐使用环境变量获取；用户的 SecretKey，建议使用子账号密钥，授权遵循最小权限指引，降低使用风险。子账号密钥获取可参考https://cloud.tencent.com/document/product/598/37140
})

module.exports = cos
export {}
