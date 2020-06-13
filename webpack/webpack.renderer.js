const path = require('path');
const { spawn } = require('child_process');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const packageJson = require('../package.json');

function buildConfig(env = {}) {
  // Parse env vars
  const envProps = env && typeof env === 'object' ? Object.keys(env) : [];
  const isProduction = envProps.includes('PRODUCTION');
  const isStartHot = envProps.includes('START_HOT');
  const buildEnv = isProduction ? 'production' : 'development';

  // Parse package json vars
  const version = packageJson.version || '0.0.0';
  const title = packageJson.title || 'App';

  // Copy items plugin
  const copyPluginOptions = {
    patterns: [
      {
        from: path.resolve(__dirname, '../package.json'),
        to: '.',
      },
      {
        from: path.resolve(__dirname, '../assets/AppIcon.icns'),
        to: '.',
      },
    ],
  };

  // Compile config
  return {
    mode: buildEnv,
    target: 'electron-renderer',
    entry: path.resolve(__dirname, '../src/index.tsx'),
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'bundle.js',
    },
    resolve: {
      extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.css'],
      mainFields: ['main', 'browser'],
      plugins: [new TsconfigPathsPlugin()],
      alias: {
        ...(!isProduction && {
          'react-dom': '@hot-loader/react-dom',
        }),
      },
    },
    // Workaround for ws module trying to resolve web-based dependencies in electron
    externals: ['utf-8-validate', 'bufferutil', 'encoding'],
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'styles.min.css',
        chunkFilename: '[id].min.css',
      }),
      new ForkTsCheckerWebpackPlugin({
        reportFiles: ['src/**/*.tsx', 'src/**/!(main).ts'],
      }),
      new webpack.NamedModulesPlugin(),
      new HtmlWebpackPlugin({
        title,
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(buildEnv),
        VERSION: JSON.stringify(version),
      }),
      new CopyPlugin(copyPluginOptions),
    ],
    module: {
      rules: [
        {
          test: /\.scss$/,
          loaders: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.css$/,
          loaders: ['style-loader', 'css-loader'],
        },
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [
            'file-loader',
            {
              loader: 'image-webpack-loader',
              options: {
                disable: true,
              },
            },
          ],
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/',
              },
            },
          ],
        },
        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader',
        },
      ],
    },
    devtool: 'cheap-source-map',
    devServer: {
      port: 2003,
      compress: true,
      noInfo: true,
      stats: 'errors-only',
      inline: true,
      hot: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      historyApiFallback: {
        verbose: true,
        disableDotRule: false,
      },
      before() {
        if (isStartHot) {
          console.info('Hot reload enabled, serving main..');
          spawn('yarn', ['--inspect=9229', 'serve:main'], {
            shell: true,
            env: process.env,
            stdio: 'inherit',
          })
            .on('close', (code) => process.exit(code))
            .on('error', (spawnError) => console.error(spawnError));
        }
      },
    },
  };
}

module.exports = buildConfig;
