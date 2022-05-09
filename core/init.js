const Router = require('koa-router')
const requireDirectory = require('require-directory')

// 注册路由的方法
class InitManager {
    static initCore(app) {
        // 入口方法
        InitManager.app = app;
        InitManager.initLoadRouters()
        InitManager.loadHttpException()
        InitManager.loadConfig()
    }

    // 加载全部路由
    static initLoadRouters() {
        // 绝对路径
        const apiDirectory = `${process.cwd()}/app/api`
        // 路由自动加载
        requireDirectory(module, apiDirectory, {
            visit: whenLoadModule
        })

        // 判断 requireDirectory 加载的模块是否为路由
        function whenLoadModule(obj) {
            if (obj instanceof Router) {
                InitManager.app.use(obj.routes())
            }
        }
    }
    // 挂载全局的配置
    static loadConfig(path = '') {
        const configPath = path || process.cwd() + '/config/config.js'
        const config = require(configPath)
        global.config = config
    }

    // 异常处理 挂载到global上面，使用到的时候不需要导入，但是一般建议导入
    static loadHttpException() {
        const errors = require('./http-exception')
        global.errs = errors
    }
}

module.exports = InitManager
