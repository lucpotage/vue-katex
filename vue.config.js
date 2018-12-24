module.exports = {
  configureWebpack: (config) => {
    config.externals = {
      ...config.externals,
      'katex': 'katex',
    };
  },
};
