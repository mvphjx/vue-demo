// 弃用，改为vite
const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  // 配置开发服务器
  devServer: {
    port: 8080,
    open: true,
    // 配置代理解决跨域问题
    // proxy: {
    //   '/api': {
    //       target: 'http://localhost:3000',
    //       changeOrigin: true,
    //       pathRewrite: {
    //         '^/api': ''
    //       }
    //   }
    // }
  },

  // 配置别名
  configureWebpack: {
    resolve: {
      alias: {
        '@': require('path').resolve(__dirname, 'src'),
        'components': require('path').resolve(__dirname, 'src/components')
      }
    }
  },

  // 配置CSS
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: process.env.NODE_ENV === 'production',
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      scss: {
        /*sass-loader 配置*/
      }
    }
  }
})
