const db = require('../app/database')

class FileService {
  // avatarLink is exists
  async isExistsAvatarLink (userId: number) {
    const sqlString = `
      SELECT *
      FROM avatar
      WHERE user_id = ?;
    `
    return (await db.execute(sqlString, [userId]))[0].length
  }

  async setAvatarLink (avatarUrl: string, mimetype: string, size: string, filename: string, userId: number, type: string) {
    let sqlString = ''
    switch (type) {
      case 'new':
        sqlString = `INSERT INTO avatar (avatar_url, mimetype, size, filename, user_id)
                     VALUES (?, ?, ?, ?, ?);`
        break
      case 'update':
        sqlString = `UPDATE avatar
                     SET avatar_url = ?,
                         mimetype   = ?,
                         size       = ?,
                         filename   = ?
                     WHERE user_id = ?;`
        break
    }
    await db.execute(sqlString, [avatarUrl, mimetype, size, filename, userId])
  }

  // get avatar by userId
  async getAvatarByUserId (userId: number) {
    const sqlString = `SELECT avatar_url, mimetype, size, filename
                       FROM avatar
                       WHERE user_id = ?`
    return (await db.execute(sqlString, [userId]))[0][0]
  }

  // link picture and moment
  async insertPictureLink (pictureUrl: string, mimetype: string, size: string, filename: string, userId: number, momentId: string) {
    console.log([pictureUrl, mimetype, size, filename, userId, momentId])
    try {
      const sqlString = `INSERT INTO picture (picture_url, mimetype, size, filename, user_id, moment_id)
                         VALUES (?, ?, ?, ?, ?, ?);`
      await db.execute(sqlString, [pictureUrl, mimetype, size, filename, userId, momentId])
    } catch (e) {
      console.log(e)
    }
  }

  // // link user and avatar
  // async newAvatarLink (avatarUrl: string, mimetype: string, size: string, userId: number) {
  //   const sqlString = `
  //     INSERT INTO avatar (avatar_url, mimetype, size, user_id)
  //     VALUES (?, ?, ?, ?);
  //   `
  //   await db.execute(sqlString, [avatarUrl, mimetype, size, userId])
  // }
  // // update avatarLink
  // async updateAvatarLink (avatarUrl: string, mimetype: string, size: string, userId: number) {
  //   const sqlString = `
  //     UPDATE avatar
  //     SET avatar_url = ?,
  //         mimetype   = ?,
  //         size= ?
  //     WHERE user_id = ?;
  //   `
  //   await db.execute(sqlString, [avatarUrl, mimetype, size, userId])
  // }
}

module.exports = new FileService()
export {}
