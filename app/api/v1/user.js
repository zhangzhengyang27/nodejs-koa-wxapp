const Router = require('koa-router')

const {RegisterValidator} = require('../../validators/user')
const {User} = require('@models/user')
const {handleResult} = require('../../lib/helper')

const router = new Router({
    prefix: '/v1/user'
})

// 用户注册
router.post('/register', async (ctx) => {
    // 如果验证器里面有异步的话，必须要改造成异步的操作
    const v = await new RegisterValidator().validate(ctx)
    const user = {
        email: v.get('body.email'),
        password: v.get('body.password2'),
        nickname: v.get('body.nickname')
    }

    const r = await User.create(user)
    // 返回操作返回给前端
    handleResult('注册成功')
})

module.exports = router
