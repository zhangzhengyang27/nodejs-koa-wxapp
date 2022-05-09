const {Sequelize, Model, Op} = require('sequelize')
const {sequelize} = require('../../core/db')
const {Favor} = require('./favor')

class HotBook extends Model {
    static async getAll() {
        // 根据index排序
        const books = await HotBook.findAll({
            order: ['index'],
        })
        const ids = []
        books.forEach(book => {
            ids.push(book.id)
        })
        // 根据art_id进行分组
        const favors = await Favor.findAll({
            where: {
                art_id: {
                    [Op.in]: ids,
                    type:400
                },
            },
            group: ['art_id'],
            //attributes记录接口返回的字段值； 每一个art_id的count的数据值，count求和
            attributes: ['art_id', [Sequelize.fn('COUNT', '*'), 'count']],
        })
        books.forEach(book => {
            HotBook.getEachBookStatus(book, favors)
        })
        return books
    }

    static getEachBookStatus(book, favors) {
        let count = 0
        favors.forEach(favor => {
            if (book.id === favor.art_id) {
                count = favor.get('count')
            }
        })
        book.setDataValue('fav_nums', count)
        return book
    }
}

HotBook.init({
    index: Sequelize.INTEGER,
    image: Sequelize.STRING,
    author: Sequelize.STRING,
    title: Sequelize.STRING,
}, {
    sequelize,
    tableName: 'hot_book',
})

module.exports = {
    HotBook,
}
