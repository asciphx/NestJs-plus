
# NestJs-plus（mongodb版）

## [论坛链接](http://www.91huanwei.com)
使用 Nest 构建，一个简单的用户发帖系统。
## 特别地
由特殊编程人员Asciphx修正，为支持mongodb，jwt，websocket，pm2。
原贴地址 [dzzzzzy/Nestjs-Learning](https://github.com/dzzzzzy/Nestjs-Learning/edit/master/README.md)
### 主要特性

- 使用 Typescript，强类型语言、类型推断机制、编译期类型检查等，为后端开发和维护提供了很好的支持
- 模块化开发，让应用程序更容易分层，提供了易于使用的模块化管理机制
- 内置 IOC 容器，大量使用依赖注入，开发更便捷、更高效
- 轻松编写 AOP 代码，面向切面编程，轻松实现日志、拦截器、过滤器等功能
- 支持 TypeORM，最好的 Typescript ORM 框架，轻松编写 DAO 层的各类逻辑
- 轻松构建 MVC、API、websocket、微服务等系统
- ......

### 框架 Github 地址: [Nest](https://github.com/nestjs/nest) 🎁

## 框架文档

[官方文档](https://docs.nestjs.com)    [中文文档](https://docs.nestjs.cn)

## 相关技术文档

- [NodeJS](https://nodejs.org)
  - [v12文档(最新)](https://nodejs.org/dist/latest-v12.x/docs/api/)
- [Typescript](https://www.typescriptlang.org)
  - 📚 [官方文档](https://www.typescriptlang.org/docs/home.html)
  - 📚 [中文文档](https://www.tslang.cn/docs/home.html)
- [GraphQL](https://github.com/graphql/graphql-js)
  - 📚 [官方文档](https://graphql.org)
  - 📚 [中文文档](https://graphql.cn)
  - 🏫 [GraphQL的全栈教程](https://www.howtographql.com/)
  - GraphQL IDE [graphql-playground](https://github.com/prisma/graphql-playground)
- [TypeORM](https://github.com/typeorm/typeorm)
  - 📚 [官方文档](http://typeorm.io)
- ......

## Nest 学习手册

> 由于官方文档更新较为频繁，推荐大家尽可能的查阅[官方文档](https://docs.nestjs.com)进行学习

- 基础功能
  - [Controller](./docs/controller.md)  控制器
  - [Provider](./docs/provider.md)  提供者
  - [Module](./docs/module.md)  模块(核心依赖注入思想)
  - [NestFactory](./docs/nest-factory.md)   创建 Nest 应用的工厂类
- 高级功能
  - [Middleware](./docs/middleware.md)  中间件
  - [Exception Filter](./docs/exception-filter.md)  异常过滤器
  - [Pipe](https://docs.nestjs.com/pipes)   管道
  - [Guard](https://docs.nestjs.com/guards) 守卫
  - [Interceptor](https://docs.nestjs.com/interceptors) 拦截器

## Demo

- [CRUD Restful API Demo](./demo/rest-api/README.md) Restful 风格的增删改查示例项目。
- [GraphQL API Demo](./demo/graphql-api/README.md) GraphQL 风格的增删改查示例项目，包含简单的 GraphQL 订阅功能。
- [easy-post](./demo/easy-post/README.md) 便利贴，包含用户登录注册，用户授权、用户认证、帖子管理、用户管理等功能。


## 功能
- [x] 注册
- [x] 登录
- [x] 用户授权（jwt)
- [x] 用户认证（简单的RBAC)
- [x] 用户管理
- [x] 帖子管理
## 项目结构
- common 用于存放公共的 interface、decorators
- core 用于存放核心的 auth、guards、interceprots
- feature 用于存放系统业务模块，用户模块、帖子模块
```bash
# 安装依赖
$ yarn install

# 创建 test 数据库

# 启动程序
$ yarn run start
```
