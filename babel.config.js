export default function (api) {
  // https://babeljs.io/docs/en/config-files#config-function-api

  return {
    ignore: ['./node_modules'],
    presets: [
      ['@babel/preset-env', { modules: false, loose: true }],
      [
        '@babel/preset-typescript',
        {
          isTSX: true,
          allExtensions: true
        }
      ]
    ]
  };
}
