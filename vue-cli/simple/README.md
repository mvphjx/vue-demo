# simple

> A Vue.js project

## Project Structure 项目结构
    webpack
        |___build
            |___构建项目使用到的一些脚本文件和配置文件的存放目录

        |___config
            |___index.js 开发和构建的常用配置
            |___dev.env.js
            |___prod.env.js

        |___src 项目源码
            |___main.js 入口文件，创建Vue实例
            |___App.vue 自动生成的组件

        |___static
            |___静态资源目录

        |___dist
            |___项目编译后的目录

        |___node_modules
            |___项目依赖包存放目录

        |___index.html HtmlWebpackPlugin的模板

        |___package.json 依赖管理


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
