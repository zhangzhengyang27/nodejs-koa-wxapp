const {Sequelize, Model} = require('sequelize')
const {sequelize} = require('../../core/db')

class Comment extends Model {
    // 新增评论
    static async addComment(bookId, content) {
        // 查找是否有相同的评论，如果有则是+1的操作
        const comment = await Comment.findOne({
            where: {
                book_id: bookId,
                content,
            },
        })
        // 如果没有相同的评论,则创建；否则的话+1;
        if (!comment) {
            await Comment.create({
                book_id: bookId,
                content,
                nums: 1,
            })
        } else {
            await comment.increment('nums', {
                by: 1,
            })
        }
    }

    // 查询某一book短评详情
    static async getComments(bookId) {
        return Comment.findAll({
            where: {
                book_id: bookId,
            },
        })
    }

    // 可以自定义返回的参数字段
    // toJSON() {
    //   return {
    //     content:this.getDataValue('content'),
    //     nums:this.getDataValue("nums")
    //   }
    // }
}

// 设置排除的字段值，最好是在api接口返回的时候去调用，不要再原型上用
// Comment.prototype.exclude = ['book_id', 'id']

Comment.init({
    content: Sequelize.STRING(12),
    nums: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    book_id: Sequelize.INTEGER,
}, {
    sequelize,
    tableName: 'comment',
})

module.exports = {
    Comment,
}
