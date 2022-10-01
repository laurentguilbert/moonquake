const CracoLessPlugin = require("craco-less");
const customWebpackConfig = require('./webpack-config');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {},
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  webpack: {
    configure: mergeWebpackConfig,
  },
};


function mergeWebpackConfig(webpackConfig, { env }) {
  const { plugins } = webpackConfig;
  const customConf = customWebpackConfig(env);
  return {
    ...webpackConfig,
    plugins: [...plugins, ...customConf.plugins],
    module: {
      ...webpackConfig.module,
      rules: [...webpackConfig.module.rules, ...customConf.module.rules],
    },
  };
}

