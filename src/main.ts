const app = require('./app')
const config = require('./app/config')

app.listen(config.APP_PORT, () => {
  console.log(`服务器已开启在${config.APP_PORT as number}端口上`)
})
