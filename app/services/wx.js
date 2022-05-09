const util = require('util')
const axios = require('axios')

const {User} = require('../models/user')
const {generateToken} = require('../../core/util')
const {Auth} = require('../../middlewares/auth')

class WXManager {
    static async codeToToken(code) {
        // code
        // code 小程序生成 微信
        // openid 唯一标识

        // 显示注册
        // 唯一标识
        // code
        // appid
        // appsecret
        // url
        // util字符串的格式化 第一个参数 被格式化的参数
        const url = util.format(global.config.wx.loginUrl,
            global.config.wx.appId,
            global.config.wx.appSecret,
            code)

        // 发送http的请求，接收返回的结果
        const result = await axios.get(url)

        if (result.status !== 200) {
            throw new global.errs.AuthFailed("openid获取失败")
        }
        // 返回结果，并不一定用户的code是合法的
        const errCode = result.data.errcode
        const errMsg = result.data.errmsg
        /*
        * errcode 的可能值
        *  -1 系统繁忙
        *  0 成功
        *  40029 code无效
        *  45011 频率限制，每个以用户每分钟100次
        * */
        if (errCode) {
            throw new global.errs.AuthFailed("openid获取失败: " + errMsg)
        }

        // opedId
        // 建立档案 user uid
        // openId

        // 判断数据库是否存在微信用户 opendid
        let user = await User.getUserByOpenid(result.data.openid)

        // 如果不存在，就创建一个微信小程序用户
        if (!user) {
            user = await User.createUserByOpenid(result.data.openid)
        }

        return generateToken(user.id, Auth.AUSE)
    }
}

module.exports = {
    WXManager
}
