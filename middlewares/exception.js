const {HttpException} = require('../core/http-exception')

// 全局的异常处理，作为中间件可以传递ctx、next
// AOP面向切面编程，从全局的角度触发
const catchError = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        // 开发环境
        const isHttpException = error instanceof HttpException
        // 判断开发的环境
        const isDev = global.config.environment === 'dev'

        // 这里的异常是捕获开发中的异常，抛出异常后面的代码就不会执行了
        if (isDev && !isHttpException) {
            throw error
        }

        // 返回给浏览器的异常
        // 生成环境
        if (isHttpException) {
            ctx.body = {
                msg: error.msg,
                error_code: error.errorCode,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = error.code

        } else {
            ctx.body = {
                msg: "未知错误！",
                error_code: 9999,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = 500
        }
    }
}

module.exports = catchError
