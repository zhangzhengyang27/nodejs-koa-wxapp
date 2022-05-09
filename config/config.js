module.exports = {
    environment: 'dev',
    database: {
        dbName: 'wxapp',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: 'root1234'
    },
    security: {
        secretKey: "abcdefg",
        // 过期时间 1小时 测试阶段时间调长
        expiresIn: 60 * 60 * 24 * 3
    },
    wx: {
        appId: "wxa0846ea4e56f6486",
        appSecret: "747c805f66a3886d8f8df427a3aeea94",
        // 添加占位符
        loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    },
    yushu: {
        detailUrl: 'http://t.yushu.im/v2/book/id/%s',
        keywordUrl: 'http://t.yushu.im/v2/book/search?q=%s&count=%s&start=%s&summary=%s',
    },
    host: 'http://localhost:8888/',
}
