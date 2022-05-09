/*
* api携带版本号
* 1、路径  v1/api
* 2、查询参数  api?version=v1
* 3、header
* */

/*
* 前端传参：
* /v1/:id/book/latest?param=''
* header
* body
* const path=ctx.params    获取:id
* const query=ctx.request.query   获取?
* const header=ctx.request.header
* body 里面的数据需要一个koa-bodyparser 插件解析
* const body=ctx.request.body
* */

var a = 10;

function f1() {
    b = 20

    function f2() {
        c = 30
        console.log(a) // 10
    }

    f2()
}

f1()

// b和c变量被隐式声明到全局变量了，所以能访问到，这也叫变量提升机制
console.log(b) // 10
console.log(c) // 20

// 但a，b，c也被挂载在window对象（全局作用域）上面了
console.log(window.a) // 10
console.log(window.b) // 20
console.log(window.c) // 30
