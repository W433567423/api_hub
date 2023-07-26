class MomentController {
  async publish (ctx) {
    ctx.body = {
      success: 'ok'
    }
  }
}

module.exports = new MomentController()
export {}
