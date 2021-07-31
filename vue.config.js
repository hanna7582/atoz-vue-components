let assetsDir = 'assets'

module.exports = {
  publicPath: '/',
  assetsDir: assetsDir,
  productionSourceMap: false,
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options =>
        Object.assign(options, {
          //https://cli.vuejs.org/guide/html-and-static-assets.html#static-assets-handling
          limit: 10240, //10kb = 10240b (HTTP 요청 양을 줄이는 데 사용)
          esModule: false
        })
      )
    config.module
      .rule('md')
      .test(/\.md/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markdown-loader')
      .loader('vue-markdown-loader/lib/markdown-compiler')
      .options({
        raw: true
      })
  }
}
