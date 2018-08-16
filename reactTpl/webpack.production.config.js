const path = require('path')
const nodeModuleDir = path.resolve(__dirname, 'node_module')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    app: [path.resolve(__dirname, 'app/main.js')]
  },
  output: {
    path: path.resolve(__dirname, 'build/'),
    chunkFilename: '[name].[chunkhash:5].js',
    filename: 'app.[chunkhash:5].js'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: ['babel-loader'],
      include: [path.resolve(__dirname, 'app')],
      exclude: [nodeModuleDir]
    },
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader?modules&localIdentName=_[local]_[hash:base64:5]',
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            config: { path: path.resolve(__dirname, 'postcss.config.js') }
          }
        }
      ],
      include: [path.resolve(__dirname, 'app')],
      exclude: [nodeModuleDir]
    },
    {
      test: /\.(png|svg|jpg|gif)$/,
      use: 'file-loader?name=[name].[ext]&outputPath=./image/',
      include: [path.resolve(__dirname, 'app')],
      exclude: [nodeModuleDir]
    }
    ]
  },
  node: { Buffer: false },
  optimization: {
    minimizer: [
      // we specify a custom UglifyJsPlugin here to get source maps in production
      new UglifyJsPlugin({
        uglifyOptions: {
          // 最紧凑的输出
          beautify: false,
          // 删除所有的注释
          comments: false,
          compress: {
            // 在UglifyJs删除没有用到的代码时不输出警告
            warnings: false,
            // 删除所有的 `console` 语句
            // 还可以兼容ie浏览器
            drop_console: true,
            // 内嵌定义了但是只用到一次的变量
            collapse_vars: true,
            // 提取出出现多次但是没有定义成变量去引用的静态值
            reduce_vars: true
          }
        }
      })
    ]
  },
  plugins: [
    new CleanWebpackPlugin('build'),
    new HtmlWebpackPlugin({
      template: 'index_tpl.html'
    })
  ]
}
