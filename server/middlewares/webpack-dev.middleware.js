const webpack = require('webpack');
const webpackDevMiddleware = require('koa-webpack-middleware');

const webpackConfig = require('../../webpack.config');

let middleware = async (ctx, next) => {
    next();
};

if (process.env.NODE_ENV !== 'production') {
    webpackConfig.mode = process.env.NODE_ENV || 'development';
    middleware = webpackDevMiddleware.devMiddleware(webpack(webpackConfig), {
        stats: {
            chunks: false,
            children: false,
            colors: true,
            entrypoints: false,
            modules: false
        }
    });
}

module.exports = middleware;