import MiniCssCleanupPlugin from './mini-css-cleanup-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';

export default {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /.*\/(.*)\.css/,
          name(module) {
            const packageName = module.issuer.resource.match(/.*\/(.*)\..*/)[1];
            return `${packageName}`;
          },
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    // new MiniCssCleanupPlugin()
  ]
}