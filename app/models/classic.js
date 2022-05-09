const {sequelize} = require('../../core/db');
const {Sequelize, Model} = require('sequelize');

// vue react 不适合做网站 SEO效果不好 尤其是TO c的业务
// CMS 内部系统  WebAPP H5
const classicFields = {
    image: Sequelize.STRING,
    content: Sequelize.STRING,
    pubdate: Sequelize.DATEONLY,
    fav_nums: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    title: Sequelize.STRING,
    type: Sequelize.TINYINT
}

// 电影
class Movie extends Model {

}

// init() 创建
Movie.init(classicFields, {
    sequelize,
    tableName: 'movie'
})


class Sentence extends Model {

}

Sentence.init(classicFields, {
    sequelize,
    tableName: 'sentence'
})


// 音乐
class Music extends Model {
}

// 会有单独的url字段
const musicFields = Object.assign({url: Sequelize.STRING}, classicFields)
Music.init(musicFields, {
    sequelize,
    tableName: 'music'
})

module.exports = {
    Movie,
    Sentence,
    Music
}
