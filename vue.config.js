// 拼接路径
const resolve = dir => require('path').join(__dirname, dir)

// 基础路径 注意发布之前要先修改这里
let baseUrl = process.env.BASE_URL
const Timestamp = new Date().getTime(); // 时间戳
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 导入compression-webpack-plugin
const CompressionWebpackPlugin = require("compression-webpack-plugin");
// 定义压缩文件类型
const productionGzipExtensions = ["js", "css"];
module.exports = {
  publicPath: './', // 根据你的实际情况更改这里
  lintOnSave: false,
  devServer: {
    publicPath: baseUrl, // 和 baseUrl 保持一致
  },
  //   devServer:{
  //       proxy:{  // 重写的方式，把请求代理到express服务器上
  //           '/api':{
  //               target:'http://180.96.11.28:8008',
  //           }
  //       }
  //   },
  configureWebpack: {
      output: {
          // 输出重构  打包编译后的 文件名称  【模块名称.版本号】
          filename: `js/[name].${process.env.VUE_APP_Version}.${Timestamp}.js`,
          chunkFilename: `js/[name].${process.env.VUE_APP_Version}.${Timestamp}.js`
      },
      plugins: [
          new CompressionWebpackPlugin({
              filename: "[path].gz[query]",
              algorithm: "gzip",
              test: new RegExp("\\.(" + productionGzipExtensions.join("|") + ")$"), //匹配文件名
              threshold: 10240, //对10K以上的数据进行压缩
              minRatio: 0.8,
              deleteOriginalAssets: false //是否删除源文件
          }),
          new MiniCssExtractPlugin({
              // 修改打包后css文件名
              filename: `css/[name].${process.env.VUE_APP_Version}.${Timestamp}.css`,
              chunkFilename: `css/[name].${process.env.VUE_APP_Version}.${Timestamp}.css`
          })
      ]
  },
  // 默认设置: https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-service/lib/config/base.js
  chainWebpack: config => {
      config.plugins.delete('preload')
      config.plugins.delete('prefetch')

    // 解决 cli3 热更新失效 https://github.com/vuejs/vue-cli/issues/1559
    config.resolve
      .symlinks(true)
    // markdown
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('text-loader')
      .loader('text-loader')
      .end()
      // config.module
      //     .rule('css')
      //     .test( /\.css$/)
      //     .loader('style-loader!css-loader')
      //     .end()
      // config.module
      //     .rule('png|jpg|gif')
      //     .test( /\.(png|jpg|gif)$/)
      //     .loader('url-loader?limit=8192')
      //     .end()
      // config.module
      //     .rule('svg')
      //     .test( /\.svg/)
      //     .loader('svg-url-loader')
      //     .end()
      // config.module
      //     .rule('eot|woff|ttf')
      //     .test( /\.(eot|woff|ttf)$/)
      //     .loader('file-loader')
      //     .options({
      //         outputPath:"/font/"
      //     })
      //     .end()
    // i18n
    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .use('i18n')
      .loader('@kazupon/vue-i18n-loader')
      .end()
    // svg
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .include
      .add(resolve('src/assets/svg-icons/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'd2-[name]'
      })
      .end()
    // image exclude
    const imagesRule = config.module.rule('images')
    imagesRule
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .exclude
      .add(resolve('src/assets/svg-icons/icons'))
      .end()
    // 重新设置 alias
    config.resolve.alias
      .set('@', resolve('src'))
    // babel-polyfill 加入 entry
    const entry = config.entry('app')
    entry
      .add('babel-polyfill')
      .end()
  }
}
