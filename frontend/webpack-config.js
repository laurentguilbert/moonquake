const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

module.exports = (env) => {
  const plugins = [new AntdDayjsWebpackPlugin()];

  return {
    module: {
      rules: [
        {
          test: /\.module.less$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: true,
              },
            },
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  javascriptEnabled: true,
                },
              },
            },
          ],
        },
      ],
    },
    plugins,
  };
};
