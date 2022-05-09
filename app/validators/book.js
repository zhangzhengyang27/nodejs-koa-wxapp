const {
    Rule,
    LinValidator
} = require('../../core/lin-validator-v2')
const {PositiveIntegerValidator} = require("./classic");

// 校验搜索图书接口参数
class SearchValidator extends LinValidator {
    constructor() {
        super()
        this.q = [
            new Rule('isLength', '搜索关键词不能为空', {
                min: 1,
                max: 16,
            }),
        ]
        this.start = [
            new Rule('isInt', 'start不符合规范', {
                min: 0,
                max: 60000,
            }),
            new Rule('isOptional', '', 0),
        ]
        this.count = [
            new Rule('isInt', 'count不符合规范', {
                min: 1,
                max: 20,
            }),
            new Rule('isOptional', '', 20),
        ]
    }
}

// 校验增加短评接口参数
class AddShortComment extends PositiveIntegerValidator {
    constructor() {
        super()
        this.content = [
            new Rule('isLength', '长度必须在1到12之间', {
                min: 1,
                max: 12,
            }),
        ]
    }
}

module.exports = {
    SearchValidator,
    AddShortComment
}
