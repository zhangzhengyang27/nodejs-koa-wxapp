const {Movie, Music, Sentence} = require('./classic');
const {flatten} = require("lodash");
const {Op} = require("sequelize");

// 会导致循环导入 ，在函数内部导入
// const {Favor} = require("./favor");

class Art {
    constructor(art_id, type) {
        this.art_id = art_id;
        this.type = type;
    }

    async getDetail(uid) {
        const {Favor} = require("./favor");
        const art = await Art.getData(this.art_id, this.type);
        if (!art) {
            throw new global.errs.NotFound();
        }

        const like = await Favor.userLikeIt(
            this.art_id, this.type, uid
        )
        /*art.setDataValue("loke_status", like)
        return art*/
        return {
            art,
            like_status: like
        }
    }


    static async getList(artInfoList) {
        const artInfoObj = {
            100: [],
            200: [],
            300: [],
        }
        for (let artInfo of artInfoList) {
            artInfoObj[artInfo.type].push(artInfo.art_id)
        }
        // 所有的obj对象的key都是字符串
        const arts = []
        for (let key in artInfoObj) {
            const ids = artInfoObj[key]
            if (ids.length === 0) {
                continue
            }
            key = parseInt(key)
            arts.push(await Art._getListByType(ids, key))
        }
        return flatten(arts)
    }

    static async _getListByType(ids, type) {
        let arts = null;
        const finder = {
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        };
        // scope用来排除某些字段返回前端
        const scope = 'bh';
        switch (type) {
            case 100:
                arts = Movie.scope(scope).findAll(finder);
                break;
            case 200:
                arts = Music.scope(scope).findAll(finder);
                break;
            case 300:
                arts = Sentence.scope(scope).findAll(finder);
                break;
            case 400:
                break;
            default:
                arts = await Movie.scope(scope).findAll(finder)
                break;

        }

        return arts;
    }

    // useScope 为true会产生bug,所以通过字段去控制
    static async getData(artId, type, useScope = true) {
        let art = null;
        const finder = {
            where: {
                id: artId
            }
        };
        // scope用来排除某些字段返回前端
        const scope = useScope ? 'bh' : null;
        switch (type) {
            case 100:
                art = Movie.scope(scope).findOne(finder);
                break;
            case 200:
                art = Music.scope(scope).findOne(finder);
                break;
            case 300:
                art = Sentence.scope(scope).findOne(finder);
                break;
            case 400:
                const {Book} = require("./book");
                art = await Book.scope(scope).findOne(finder);
                if (!art) {
                    art = await Book.create({
                        id: artId
                    })
                }
                break;
            default:
                break;

        }

        return art;
    }
}

module.exports = {
    Art
}
