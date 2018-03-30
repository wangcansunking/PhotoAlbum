const koaStatic = require('koa-static');

let middleware = async (ctx, next) => {
    next();
};

if (process.env.NODE_ENV === 'production') {
    middleware = koaStatic(__dirname + '/../../dist', {
        maxage: 6 * 30 * 24 * 60 * 60 * 1000,
        gzip: true
    });
}

module.exports = middleware;