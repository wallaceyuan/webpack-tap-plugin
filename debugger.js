var webpack = require('webpack/lib/webpack');
let config = require('./webpack.config')
let compile = webpack(config)


compile.run()
