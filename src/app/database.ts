const mysql = require('mysql2')

const db = mysql.createPool({
  host: config.MYSQL_HOST,
  port: config.MYSQL_PORT,
  database: config.MYSQL_DATABASE,
  user: config.MYSQL_USER,
  password: config.MYSQL_PASSWORD
})

// eslint-disable-next-line n/handle-callback-err
db.getConnection((err: any, conn: any) => {
  conn.connection((err: any) => {
    console.log(`数据库${config.MYSQL_DATABASE as string}连接成功${err as string}`)
  })
})
