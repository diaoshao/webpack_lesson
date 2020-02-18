const path = require('path');
const webpack = require('webpack');
module.exports = {
    entry: {
        app: __dirname + '/src/app.js'
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    }
}