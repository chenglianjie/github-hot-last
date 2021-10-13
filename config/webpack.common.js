const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // css抽离
const chalk = require('chalk')
const ProgressBarPlugin = require('progress-bar-webpack-plugin') // 编译进度条
module.exports = {
  output: {
    path: __dirname + '/../dist',
    // [contenthash:8] - 本应用打包输出文件级别的更新，导致输出文件名变化
    filename: '[name]-[contenthash:8].js',
    // 编译前清除目录
    clean: true,
  },
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    mainFiles: ['index', 'main'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
      },
      {
        test: /\.js$/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.(le|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'postcss-loader',
          // 当解析antd.less，必须写成下面格式，否则会报Inline JavaScript is not enabled错误
          { loader: 'less-loader', options: { lessOptions: { javascriptEnabled: true } } },
        ],
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        type: 'asset/inline',
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'assets/[name].css',
    }),
    // 进度条
    new ProgressBarPlugin({
      format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`,
    }),
  ],
}
