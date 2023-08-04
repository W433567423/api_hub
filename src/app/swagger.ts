const path = require('path')
const router = require('koa-router')() // 引入路由函数
const swaggerJSDoc = require('swagger-jsdoc')

const swaggerDefinition = {
  info: {
    title: 'hub Swagger',
    summary: 'a swagger API for hub',
    description: 'This is a swagger API for hub',
    termsOfService: 'https://example.com/terms/',
    contact: {
      name: 'tutu',
      url: 'https://wtututu.top',
      email: 't433567423@163.com'
    },
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
    },
    version: '1.0.1'
  },
  host: 'localhost:8001',
  basePath: '/' // Base path (optional)
}
const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, '../controller/*.ts')] // 写有注解的router的存放地址, 最好path.join()
}
const swaggerSpec = swaggerJSDoc(options)
// 通过路由获取生成的注解文件
router.get('/swagger.json', async function (ctx) {
  ctx.set('Content-Type', 'application/json')
  ctx.body = swaggerSpec
})
module.exports = router
