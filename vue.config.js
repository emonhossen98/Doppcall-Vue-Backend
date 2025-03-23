// vue.config.js
module.exports = {
  devServer: {
    proxy: 'https://api.doppcall.com/api/',
  },
  chainWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      // config.optimization.minimize(false);
      config.optimization.splitChunks({
        chunks: 'all'
      });
    }
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all',
        minimize: true,
        runtimeChunk: 'single',
      }
    },
    plugins: [
      // Add plugins here if needed
    ]
  },
  chainWebpack: config => {
    config.plugin('compression').use(require('compression-webpack-plugin'), [
      {
        algorithm: 'gzip',
        test: /\.(js|css|html|svg)$/,
        threshold: 10240,
        minRatio: 0.8
      }
    ]);

    // Other configurations...
  },
  productionSourceMap: false
};