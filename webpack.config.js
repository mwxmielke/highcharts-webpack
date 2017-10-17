const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ENV = process.env.npm_lifecycle_event
const isProd = ENV === 'build'

const config = {
    context: __dirname + '/src', // `__dirname` is root of project and `src` is source
    entry: {
        app: ['whatwg-fetch',"./app.js"],
    },
    output: {
        path: __dirname + '/dist', // `dist` is the destination
        publicPath: isProd ? '' : 'http://localhost:3000/', // set local host name and port e.g.: http://r2d2.mediaworx.de:3000/
        filename: 'bundle.js',
    },
    //To run development server
    devServer: {
        contentBase: __dirname + '/src', // `__dirname` is root of the project
        port: 3000,        //Port Number
        host: '0.0.0.0'  //Change to '0.0.0.0' for external facing server
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    },
    plugins: [
        // Define env variables to help with builds
        // Reference: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
        new webpack.DefinePlugin({
            // Environment helpers
            'process.env': {
                ENV: JSON.stringify(ENV),
            }
        }),
        // Inject script and link tags into html files
        // Reference: https://github.com/ampedandwired/html-webpack-plugin
        new HtmlWebpackPlugin({
            template: 'index.html',
            cache: false
        }),
    ]
}

// Add build specific plugins
if (isProd) {
    config.plugins.push(
        // Reference: http://webpack.github.io/docs/list-of-plugins.html#uglifyjsplugin
        // Minify all javascript, switch loaders to minimizing mode
        new webpack.optimize.UglifyJsPlugin({beautify: false, comments: false, mangle: { keep_fnames: true }})
    )
} else {
    config.devtool = "source-map" // Default development sourcemap
}

module.exports = config