module.exports = {
    // Other Webpack config options...
    ignoreWarnings: [
      {
        module: /face-api\.js/,
        message: /Failed to parse source map/,
      },
    ],
  };
  