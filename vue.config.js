const webpack = require('webpack');

module.exports = {
  configureWebpack: config => {
    config.output.globalObject = "window"
  },
  chainWebpack: config => {
    config
      .plugin('jquery')
      .use(
        webpack.ProvidePlugin,
        [{
          $: 'jquery',
          jQuery: 'jquery',
          jquery: 'jquery',
          'window.jQuery': 'jquery'
        }]
      )

    config.module
      .rule('compile')
      .test(/\.js$/)
      .exclude
      .add(/node_modules/)
      .end()
      .use('babel')
      .loader('babel-loader')
      .options({
        presets: [
          ['@babel/preset-env']
        ]
      });
  }
}
