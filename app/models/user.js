const bcrypt = require('bcryptjs')
// 创建用户的模型
const {sequelize} = require('../../core/db');
// 对引入的包重命名
// const {sequelize：db} = require('../../core/db');
const {Sequelize, Model} = require('sequelize');

// 定义用户模型
class User extends Model {
    static async verifyEmailPassword(email, plainPassword) {

        // 查询用户
        const user = await User.findOne({
            where: {
                email
            }
        })
        console.log(user)
        if (!user) {
            throw new global.errs.AuthFailed('账号不存在')
        }

        // 验证密码  plainPassword 用户输入的密码
        const correct = bcrypt.compareSync(plainPassword, user.password)

        if (!correct) {
            throw new global.errs.AuthFailed('密码不正确')
        }

        return user
    }

    // 查询是否存在 opendid 的小程序用户
    static async getUserByOpenid(openid) {
        // 查询用户
        const user = await User.findOne({
            where: {
                openid
            }
        })

        return user;
    }

    // 注册小程用户
    static async createUserByOpenid(openid) {
        // 注册用户  只写入openid
        const user = await User.create({
            openid
        })

        return user;
    }

}

// 初始用户模型
User.init({
    id: {
        type: Sequelize.INTEGER,
        // 标志为主键，区分不同的用户;不能为空 不能重复
        // 设计主键的时候 最好使用数字，随机字符串 GUID（但是会拖慢查询的速度）
        // 但是使用数字会导致被破解用户标号，传入用户编号调动接口；最好的是做接口保护 设置权限Token
        primaryKey: true,
        autoIncrement: true
    },
    nickname: Sequelize.STRING,
    email: {
        type: Sequelize.STRING(128),
        unique: true
    },
    password: {
        // 扩展 设计模式 观察者模式
        // ES6 Reflect Vue3.0
        type: Sequelize.STRING,
        set(val) {
            // 加密 10 salt代表计算机生salt的成本，数字越大，计算机生成成本越大
            // 及时明文的密码一样，但是生成之后的加密密码也是不一样的
            const salt = bcrypt.genSaltSync(10)
            // 生成加密密码
            const psw = bcrypt.hashSync(val, salt)
            // this指代这个模型
            this.setDataValue("password", psw)
        }
    },
    // 小程序中 用户对应小程序会有一个openId
    // 但是在小程序 公众号中有唯一的unionID
    openid: {
        type: Sequelize.STRING(64),
        unique: true
    },
}, {
    sequelize,
    tableName: 'user'
})


module.exports = {
    User
}
