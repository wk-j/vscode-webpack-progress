## Webpack Progress

Display Webpack build progress in VS Code Status Bar.

![](https://github.com/wk-j/vscode-webpack-progress/raw/master/images/progress.png)

## Installation

- <kbd>Command</kbd> + <kbd>P</kbd>
- Type: `ext install webpack-progress`
- Press <kbd>Enter</kbd>

## webpack.config.js

You have to install [bitbar-webpack-progress-plugin](https://github.com/wk-j/bitbar-webpack-progress-plugin)

```javascript
var BitBarWebpackProgressPlugin = require("bitbar-webpack-progress-plugin");

module.exports = {
  ...
  plugins: [
      new BitBarWebpackProgressPlugin()
  ]
};
```