const Sequelize = require('sequelize')
const {unset, clone, isArray} = require("lodash");
const {Model} = require("sequelize");

const {
    dbName,
    host,
    port,
    user,
    password
} = require('../config/config').database

// Sequelize 创建表结构  要安装 mysql2 驱动
const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql',
    host,
    port,
    // 在命令行中显示sql操作
    logging: true,
    // 时区
    timezone: '+08:00',
    define: {
        // create_time && update_time
        timestamps: true,
        // delete_time
        paranoid: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        // 把驼峰命名转换为下划线
        underscored: true,
        freezeTableName: true,
        // 全局定义排除某些字段的方法
        scopes: {
            bh: {
                attributes: {
                    exclude: ['updated_at', 'deleted_at', 'created_at']
                }
            }
        }
    }
})


// 创建模型
sequelize.sync({
    force: false
})

// 返回的结果不包含事件字段
Model.prototype.toJSON = function () {
    // lodash里面clone
    const data = clone(this.dataValues)
    unset(data, 'updated_at')
    unset(data, 'created_at')
    unset(data, 'deleted_at')
    // 特殊处理图片路径
    for (const key in data) {
        if (key === 'image') {
            if (!data[key].startsWith('http')) {
                data[key] = global.config.host + data[key]
            }
        }
    }
    if (isArray(this.exclude)) {
        this.exclude.forEach(value => {
            unset(data, value)
        })
    }
    return data
}

module.exports = {
    sequelize
}
