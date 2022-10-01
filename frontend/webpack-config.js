const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

module.exports = (env) => {
  const plugins = [new AntdDayjsWebpackPlugin()];

  return {
    module: {
      rules: [],
    },
    plugins,
  };
};
