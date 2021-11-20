/* eslint-disable @typescript-eslint/no-var-requires */
const CracoLessPlugin = require('craco-less');
const webpack = require('webpack');

module.exports = function () {
  const environment = process.env.REACT_APP_ENVIRONMENT || 'prod';

  return {
    plugins: [
      {
        plugin: CracoLessPlugin,
        options: {
          lessLoaderOptions: {
            lessOptions: {
              modifyVars: {'@primary-color': '#00A3E5'},
              javascriptEnabled: true,
            },
          },
        },
      },
    ],
    webpack: {
      plugins: [
        new webpack.NormalModuleReplacementPlugin(/(.*).prod(\.*)/, function (resource) {
          resource.request = resource.request.replace(/.prod/, `.${environment}`);
        }),
      ],
    },
    babel: {
      plugins: [
        '@emotion'
      ]
    }
  };
};

