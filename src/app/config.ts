// @ts-nocheck
const dotenv = require('dotenv')

dotenv.config()

/* eslint-disable */
module.exports = {
  APP_PORT,
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_DATABASE,
  MYSQL_USER,
  MYSQL_PASSWORD,
} = process.env
/* eslint-enable */
