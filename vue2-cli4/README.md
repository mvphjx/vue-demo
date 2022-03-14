# vue2-cli4 模板项目

> A Vue.js project


## Project Structure 项目结构
    webpack
        |___src 项目源码
            |___api         请求
            |___assets      主题 字体等静态资源
            |___components  全局公用组件
            |___core  项目配置文件
            |___router  路由
            |___simplestore  简单的 全局 store管理
            |___store 全局 store管理 vuex
            |___mock 模拟数据，便于调试
                |___module 业务接口模拟数据
            |___styles  全局样式
            |___utils 全局公用方法
            |___vendor 引用的外部的js依赖
            |___views view
            |___App.vue 自动生成的组件
            |___main.js 入口文件，创建Vue实例
            |___permission.js 权限管理
        |___public
            |___静态资源目录（不会被混淆、压缩）
            |___index.html HtmlWebpackPlugin的模板
        |___dist
            |___项目编译后的目录
        |___node_modules
            |___项目依赖包存放目录
        |___build
            |___构建项目使用到的一些脚本文件和配置文件的存放目录 
        |___vue.config.js 开发和构建的常用配置
        |___.eslintignore eslint检查工具忽略文件配置
        |___.eslintrc.js eslint检查工具配置
        |___.gitignore  git版本控制忽略管理的文件配置
        |___.postcssrc.js  postcss样式后处理配置
        |___babel.config.js  js代码降级处理配置
        |___package.json 依赖管理

## run

npm install cnpm -g --registry=https://registry.npm.taobao.org
或
cnpm install


npm run serve


## build

npm run build



## views
### 404

- 父组件 App.vue
- 页面组件 error\404.vue


### 401

- 父组件 App.vue
- 页面组件 error\401.vue


### login

- 父组件 App.vue
- 页面组件 Login.vue


### 主页

- 公用组件：Header.vue、Footer.vue
- 父组件 Home.vue
- 页面组件 dashboard\index.vue


## 备注
配置头部的菜单导航一级菜单需要修改 @/components/Header.vue    二级菜单需要修改 @/components/MenuDialog.vue  其中配置的路径需要与router中配置的路径一致
