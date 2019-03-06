const docsLoader = require.resolve('./doc-loader')
module.exports = (isDev) => {
  return {
    preserveWhitepace: true,
    extractCSS: !isDev,
    cssModules: {},
    // hotReload: false // 根据环境变量生成
    loaders: {
      'docs': docsLoader
    },
    preLoader: {},
    postLoader: {}
  }
}