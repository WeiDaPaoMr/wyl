const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',
  // devServer: {
  //   host: "localhost",
  //   open: true,
  //   proxy: {
  //     '/dev-api': {
  //       target: "http://localhost:3000",
  //       changeOrigin: true,
  //       pathRewrite: {
  //         '/dev-api': ""
  //       }
  //     }
  //   }
  // }

  devServer: {
    port: 8888,
    host: "localhost",
    open: true,
    // proxy: {
    //   [process.env.VUE_APP_BASE_API]: {
    //     target: process.env.VUE_APP_SERVICE_URL,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       ["^" + process.env.VUE_APP_BASE_API]: ''
    //     }
    //   }
    // }
  }
})