// isThisType这个函数必须要放到LoginType这个对象里面
function isThisType(val) {
    for (let key in this) {
        if (this[key] === val) {
            return true
        }
    }
    return false
}

// 登录的状态
const LoginType = {
    USER_MINI_PROGRAM: 100,
    USER_EMAIL: 101,
    USER_MOBILE: 102,
    ADMIN_EMAIL: 200,
    isThisType
}

const ArtType = {
    MOVIE: 100,
    MUSIC: 200,
    SENTENCE: 300,
    BOOK: 400,
    isThisType
}

module.exports = {
    LoginType,
    ArtType
}
