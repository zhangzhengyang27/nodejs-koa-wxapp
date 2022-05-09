const Router = require('koa-router')
const router = new Router({
    prefix: "/v1/like"
})

const {LikeValidator} = require('../../validators/like')

const {Auth} = require('../../../middlewares/auth');
const {Favor} = require('../../models/favor');

const {handleResult} = require('../../lib/helper')

router.post('/', new Auth().m, async (ctx, next) => {
    // 将参数起别名 LikeValidator验证的是id，而我们传过去的则是art_id
    const v = await new LikeValidator().validate(ctx, {
        id: 'art_id'
    });
    // uid 从token令牌中获取
    await Favor.like(
        v.get('body.art_id'),
        v.get('body.type'),
        ctx.auth.uid
    )

    handleResult()
})

router.post('/cancel', new Auth().m, async (ctx, next) => {
    const v = await new LikeValidator().validate(ctx, {
        id: 'art_id'
    });

    await Favor.dislike(
        v.get('body.art_id'),
        v.get('body.type'),
        ctx.auth.uid
    )

    handleResult()
})

module.exports = router;
