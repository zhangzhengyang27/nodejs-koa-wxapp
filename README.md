## 项目介绍
[![koa](https://img.shields.io/badge/koa-%5E2.7.0-brightgreen.svg) ](https://www.npmjs.com/package/koa)
[![koa-router](https://img.shields.io/badge/koa--router-%5E7.4.0-brightgreen.svg)](https://www.npmjs.com/package/koa-router)
[![sequelize](https://img.shields.io/badge/sequelize-%5E5.6.1-brightgreen.svg)](https://www.npmjs.com/package/sequelize)
[![mysql2](https://img.shields.io/badge/mysql2-%5E1.6.5-brightgreen.svg)](https://www.npmjs.com/package/mysql2)

Node.js Koa2 实战开发微信小程序服务端API接口。

## 数据库
启动项目前一定要在创建好 `wxapp` 数据库。
```
# 登录数据库
$ mysql -uroot -p密码

# 创建 wxapp 数据库
$ CREATE DATABASE IF NOT EXISTS wxapp DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```


## 项目亮点
Koa服务端编程、异步编程、面向对象编程。

- Koa 与 Koa 二次开发API 
- 多 koa-router 拆分路由
- require-directory 自动路由加载
- nodemon修改文件自动重启
- 异步编程，async/await 
- 异步异常链与全局异常处理 
- Sequelize ORM 管理 MySQL
- JWT 权限控制中间件 
- Validator 与 LinValidator 验证器
- [更多介绍..](./doc/project.md)


## 项目来源与正版教程
- 请支持正版教程：[《纯正商业级应用－Node.js Koa2开发微信小程序服务端》](https://s.imooc.com/SHHXs2R), by 慕课网：7七月老师
- [开源：lin-cms-koa](https://github.com/TaleLin/lin-cms-koa), by TaleLin Team

