// @ts-nocheck
const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')

dotenv.config()

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, './keys/id_rsa'))
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, './keys/id_rsa.pub'))

const {
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
  VERIFY_KEY,
  COS_SECRET_ID,
  COS_SECRET_KEY,
  COS_BUCKET_NAME,
  COS_BUCKET_REGION
} = process.env

module.exports = {
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,

  VERIFY_KEY,
  PRIVATE_KEY,
  PUBLIC_KEY,

  COS_SECRET_ID,
  COS_SECRET_KEY,
  COS_BUCKET_NAME,
  COS_BUCKET_REGION
}
export {}
