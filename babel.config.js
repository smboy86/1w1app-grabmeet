module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.tsx', '.ts', '.js', '.json'],
          alias: {
            '@native-base/icons': '@native-base/icons/lib',
          },
        },
      ],
      'react-native-reanimated/plugin', // PUT IT HERE
    ],
  };
};
