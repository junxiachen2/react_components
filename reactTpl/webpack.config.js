const path = require('path')
const nodeModuleDir = path.resolve(__dirname, 'node_module')
const childProcess = require('child_process')
const config = require('./config')

let cmd
switch (process.platform) {
  case 'wind32':
    cmd = 'start'
    break
  case 'linux':
    cmd = 'xdg-open'
    break
  case 'darwin':
    cmd = 'open'
    break
}
module.exports = {
  mode: 'development',
  entry: [
    path.resolve(__dirname, 'app/main.js')
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    chunkFilename: '[name].[chunkhash:5].chunk.js',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    proxy: {
      '/api': {
        target: '',
        secure: false
      }
    },
    contentBase: path.join(__dirname, '/'),
    compress: true,
    port: config.port,
    host: config.ip,
    historyApiFallback: true,
    after: function (app) {
      childProcess.exec(`${cmd} http://${config.ip}:${config.port}/`)
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        include: [path.resolve(__dirname, 'app')],
        exclude: [nodeModuleDir]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader?modules&localIdentName=_[local]_[hash:base64:5]', 'postcss-loader'],
        include: [path.resolve(__dirname, 'app')],
        exclude: [nodeModuleDir]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
        include: [path.resolve(__dirname, 'app')],
        exclude: [nodeModuleDir]
      }
    ]
  }
}
