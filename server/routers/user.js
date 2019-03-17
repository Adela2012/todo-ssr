const Router = require('koa-router')

const userRouter = new Router({prefix: '/user'})

userRouter.post('/login', async ctx => {
  const user = ctx.request.body
  if (user.username === 'adela' && user.password === 'adela2012') {
    ctx.session.user = {
      username: 'adela'
    }
    ctx.body = {
      success: true,
      data: {
        username: 'adela'
      }
    }
  } else {
    ctx.status = 400
    ctx.body = {
      success: false,
      message: 'username or password error'
    }
  }
})

module.exports = userRouter
