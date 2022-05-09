const {
    Rule,
    LinValidator
} = require('../../core/lin-validator-v2')

const {LoginType} = require('../lib/enum')

class TokenValidator extends LinValidator {
    constructor() {
        super()
        // 账号
        this.account = [
            new Rule('isLength', '不符合账号规则', {
                min: 4,
                max: 32
            })
        ]
        // 密码 可以为空，但是如果有值，必须要做验证
        this.secret = [
            // lin .js里面设置的
            new Rule('isOptional'),
            new Rule('isLength', '最少6个字符', {
                min: 6,
                max: 128
            })
        ]
    }

    // 登录的方式
    validateLoginType(vals) {
        if (!vals.body.type) {
            throw new Error('type是必须参数')
        }

        if (!LoginType.isThisType(vals.body.type)) {
            throw new Error('type参数不合法')
        }

    }
}

class NotEmptyValidator extends LinValidator {
    constructor() {
        super()
        this.token = [
            new Rule('isLength', '不允许为空', {min: 1})
        ]
    }
}

module.exports = {
    TokenValidator,
    NotEmptyValidator
}
