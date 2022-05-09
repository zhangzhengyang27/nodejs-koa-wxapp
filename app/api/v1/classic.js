const Router = require('koa-router')
const router = new Router({
    prefix: "/v1/classic"
})

const {Auth} = require('@middlewares/auth')
const {Flow} = require('@models/flow')
const {Movie, Music, Sentence} = require('@models/classic')
const {Art} = require('@models/art')
const {Favor} = require('@models/favor')
const {PositiveIntegerValidator, ClassicValidator} = require('../../validators/classic')

// new Auth().m注册成中间件  new Auth(89).m 定义接口的权限 作成枚举可读性更好
router.get('/latest', new Auth().m, async (ctx, next) => {
    // 按照index进行排序
    const flow = await Flow.findOne({
        order: [
            ['index', 'DESC']
        ]
    })
    // 根据art_id、flow.type
    let art = await Art.getData(flow.art_id, flow.type);
    const likeLatest = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid);

    // art 类上面有很多数据，只有挂载在DateValue上才可以序列化
    // art.dataValue.index=flow.index;  setDataValue内置的方法
    art.setDataValue('index', flow.index);
    art.setDataValue('like_status', likeLatest);

    ctx.body = {
        art
    }
})
// 获取下一期的期刊
router.get('/:index/next', new Auth().m, async (ctx, next) => {
    const v = await new PositiveIntegerValidator().validate(ctx, {
        id: 'index'
    })

    const index = v.get('path.index');
    const flow = await Flow.findOne({
        where: {
            index: index + 1
        }
    });
    if (!flow) {
        throw  new global.errs.NotFound();
    }

    let art = await Art.getData(flow.art_id, flow.type);
    // 获取点赞状态的方法
    const likeNext = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid);

    art.setDataValue('index', flow.index);
    art.setDataValue('like_status', likeNext);
    // 排除数据
    // art.exclude=['index','like_status']
    ctx.body = {
        art
    }
})

// 获取上一期的期刊
router.get('/:index/previous', new Auth().m, async (ctx, next) => {
    const v = await new PositiveIntegerValidator().validate(ctx, {
        id: 'index'
    })

    const index = v.get('path.index');
    const flow = await Flow.findOne({
        where: {
            index: index - 1
        }
    });
    if (!flow) {
        throw  new global.errs.NotFound();
    }

    let art = await Art.getData(flow.art_id, flow.type);
    // 获取报刊点赞数量
    const likePrevious = await Favor.userLikeIt(flow.art_id, flow.type, ctx.auth.uid);

    art.setDataValue('index', flow.index);
    art.setDataValue('like_status', likePrevious);

    ctx.body = {
        art
    }
})

// 获取某一期的数据
router.get('/:type/:id/favor', new Auth().m, async ctx => {
    const v = await new ClassicValidator().validate(ctx);
    const id = v.get('path.id')
    // url上的数字会默认转换为字符串，通过post传参的则不会
    const type = parseInt(v.get('path.type'));

    const art = await Art.getData(id, type);
    if (!art) {
        throw new global.errs.NotFound();
    }

    const like = await Favor.userLikeIt(
        id, type, ctx.auth.uid
    )
    ctx.body = {
        fav_nums: art.fav_nums,
        like_status: like
    }
})

// 获取点赞的期刊
router.get('/favor', new Auth().m, async (ctx) => {
    const uid = ctx.auth.uid;
    ctx.body = await Favor.getMyClassFavors(uid)

})
// 获取某个期刊的详情
router.get('/:type/:id', new Auth().m, async ctx => {
    const v = await new ClassicValidator().validate(ctx);
    const id = v.get('path.id')
    // url上的数字会默认转换为字符串，通过post传参的则不会
    const type = parseInt(v.get('path.type'));
    // 实例方法  上面的代码可以简化
    const artDetail = await new Art(id, type).getDetail(ctx.auth.uid)
    artDetail.art.setDataValue('like_status', artDetail.like_status)
    ctx.body = artDetail.art
})


module.exports = router;
