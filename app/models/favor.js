const {sequelize} = require('../../core/db')
const {Sequelize, Model, Op} = require('sequelize')

const {Art} = require('./art')

class Favor extends Model {
    // 业务表
    // 添加记录
    // fave_num
    // ACID 一致性 一致性 隔离性  持久性
    // uid代表用户
    static async like(art_id, type, uid) {
        const favor = await Favor.findOne({
            where: {
                art_id,
                type,
                uid
            }
        })
        // 如果存在，则用户已经点过赞
        if (favor) {
            throw new global.errs.linkError();
        }
        // 1、添加记录flow表  2、fav_nums加1
        // 数据库的事务，保证数据的一致性
        // 一定要加上return
        return sequelize.transaction(async t => {
            await Favor.create({
                art_id,
                type,
                uid
            }, {transaction: t})

            // 找到art类，fav_nums加1
            const art = await Art.getData(art_id, type, false);
            // {by: 1, transaction: t} 传参特殊
            await art.increment('fav_nums', {by: 1, transaction: t});
        })
    }

    static async dislike(art_id, type, uid) {
        const favor = await Favor.findOne({
            where: {
                art_id,
                type,
                uid
            }
        })
        if (!favor) {
            throw new global.errs.DislikeError();
        }

        return sequelize.transaction(async t => {
            // 查询出来的favor软删除  force: false,软删除；为true则是真实删除
            await favor.destroy({
                force: false,
                transaction: t
            })
            // const art = await Art.getData(art_id, type, true); 为true时；如果后续还需要进行操作则会产生官方的bug
            const art = await Art.getData(art_id, type, false);
            await art.decrement('fav_nums', {by: 1, transaction: t});
        })
    }

    // 查询用户是否点赞过该期刊
    static async userLikeIt(art_id, type, uid) {
        const favor = await Favor.findOne({
            where: {
                art_id,
                type,
                uid
            }
        })
        return !!favor;
    }

    // 查询用户点赞过的期刊
    static async getMyClassFavors(uid) {
        const arts = await Favor.findAll({
            where: {
                uid,
                // 代表type不等于400
                type: {
                    [Op.not]: 400
                }
            }
        })
        if (arts.length === 0) {
            throw new global.errs.NotFound()
        }
        //  循环查询数据库很危险  使用ids[]查询
        return await Art.getList(arts)

    }

    // 查询书籍点赞情况
    static async getBookFavor(uid, bookId) {
        const favorNums = await Favor.count({
            where: {
                art_id: bookId,
                type: 400,
            },
        })
        const myFavor = await Favor.findOne({
            where: {
                art_id: bookId,
                uid,
                type: 400,
            },
        })
        return {
            favor_nums: favorNums,
            like_status: myFavor ? 1 : 0,
        }
    }
}

Favor.init({
    uid: Sequelize.INTEGER,
    art_id: Sequelize.INTEGER,
    type: Sequelize.INTEGER
}, {
    sequelize,
    tableName: 'favor'
})

module.exports = {
    Favor
}
