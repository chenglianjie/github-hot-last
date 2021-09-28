const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin') // js压缩
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // css抽离
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin') //css压缩
const chalk = require('chalk')
const ProgressBarPlugin = require('progress-bar-webpack-plugin') // 编译进度条
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: __dirname + '/dist',
    // [contenthash:8] - 本应用打包输出文件级别的更新，导致输出文件名变化
    filename: '[name]-[contenthash:8].js',
  },
  resolve: {
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
        test: /\.(sa|sc|le|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'postcss-loader',
          // 当解析antd.less，必须写成下面格式，否则会报Inline JavaScript is not enabled错误
          { loader: 'less-loader', options: { lessOptions: { javascriptEnabled: true } } },
          {
            loader: 'resolve-url-loader',
            options: {
              keepQuery: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
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
      template: path.resolve(__dirname, './public/index.html'),
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
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: 4,
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
      }),
      new CssMinimizerPlugin({
        parallel: 4,
      }),
    ],
  },
  devServer: {
    historyApiFallback: true,
    // static允许我们在DevServer下访问该目录的静态资源
    // 简单理解来说 当我们启动DevServer时相当于启动了一个本地服务器
    // 这个服务器会同时以static-directory目录作为跟路径启动
    // 这样的话就可以访问到static/directory下的资源了
    // static: {
    //   directory: path.join(__dirname, "../public"),
    // },
    open: true, // 自动打开页面
    // 默认为true
    hot: true,
    // 是否开启代码压缩
    compress: true,
    // 启动的端口
    port: 9000,
  },
}
