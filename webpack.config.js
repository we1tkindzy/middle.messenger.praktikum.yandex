const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const { DuplicatesPlugin } = require('inspectpack/plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    enforceExtension: false,
    fallback: {
      fs: false,
    },
    alias: {
      handlebars: 'handlebars/dist/handlebars.min.js',
      core: path.resolve(__dirname, 'src/core/'),
      components: path.resolve(__dirname, 'src/components/'),
      pages: path.resolve(__dirname, 'src/pages/'),
      helpers: path.resolve(__dirname, 'src/helpers/'),
      service: path.resolve(__dirname, 'src/service/'),
      store: path.resolve(__dirname, 'src/src/store/'),
      api: path.resolve(__dirname, 'src/api/'),
      utils: path.resolve(__dirname, 'src/utils/'),
      assets: path.resolve(__dirname, 'src/assets/'),
      tests: path.resolve(__dirname, 'src/tests/'),
    },
  },
  devServer: {
    static: path.join(__dirname, 'dist'),
    open: true,
    compress: true,
    hot: true,
    port: 1337,
    historyApiFallback: true,
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new CaseSensitivePathsPlugin(),
    new DuplicatesPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, './tsconfig.json'),
            },
          },
        ],
        exclude: /(node_modules)/
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(css|scss)$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ]
    	},
      {
        test: /.(svg|png|jpe?g|gif)$/,
        loader: 'file-loader',
        options: {
          esModule: false,
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        loader: 'file-loader',
      }
    ],
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  }
};
