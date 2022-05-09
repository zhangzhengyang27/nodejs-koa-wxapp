require('module-alias/register')
// 使用module-alias别名简化require路径

/*
* 模块导入语法：commonJs Es6  AMD
* const Koa = require('koa')
* module.export={
*   Koa:Koa
*/
const Koa = require('koa')
const InitManager = require('./core/init')
const parser = require('koa-bodyparser')
const Static = require('koa-static')
//  异常处理的中间件
const catchError = require('./middlewares/exception')
const path = require("path");

// 应用程序对象
const app = new Koa()

app.use(catchError)
app.use(parser())
app.use(Static(path.join(__dirname, './static')))

// 注册路由
InitManager.initCore(app)

app.listen(8888)

/*function test() {
    console.log("hello,world")
}*/

// use接收一个函数
// app.use(test)
// npm i nodemon -g 全局安装nodemon 自动重启服务器  nodemon app.js

// require-directory 自动引入文件的包 一般是指向一个目录的
// 导入目录的方法转移到 core/init.js文件中
/*
const requireDirectory = require('require-directory')
const Router = require("koa-router");
const modules = requireDirectory(module, './app/api', {visit: whenLoadModule})

function whenLoadModule(obj) {
    if (obj instanceof Router) {
        console.log("111")
        app.use(obj.routes())
    }
}*/

/**
 * 异常处理
 */
/*function func2() {
    try {
        func3()
    } catch (error) {
        throw error
    }
}

function func3() {
    try {
        1 / a
    } catch (error) {
        throw  error
    }
    return "success"
    // throw new Error()
    //   代码大全2书籍
}
try{}catch{} 有的时候捕捉不了异步的异常 ，因为有的异步函数会先return true

异步的try catch处理,必须是函数返回promise
async function fun2(){
    try(){
        await func3()
    }catch (error) {
        throw  error
    }
}
function func3() {
   return new Promise((resolve,reject)=>{
       setTimeout(function (){
           const r=math.random()
           if(r<0.5){
               reject('error')
           }
       },1000)
   })
}
*/


