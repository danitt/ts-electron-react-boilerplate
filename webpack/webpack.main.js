const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

function buildConfig(env = {}) {
  // Parse env vars
  const envProps = env && typeof env === 'object' ? Object.keys(env) : [];
  const isProduction = envProps.includes('PRODUCTION');
  const buildEnv = isProduction ? 'production' : 'development';

  return {
    target: 'electron-main',
    mode: buildEnv,
    entry: path.resolve(__dirname, '../src/main.ts'),
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'main.js',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
        },
      ],
    },
    node: {
      __dirname: false,
      __filename: false,
    },
    plugins: [
      new CleanWebpackPlugin(),
      new ForkTsCheckerWebpackPlugin({
        reportFiles: ['src/main.ts'],
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(buildEnv),
      }),
    ],
  };
}

module.exports = buildConfig;
