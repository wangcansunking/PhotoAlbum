const request = require('koa2-request');

let middleware = async (ctx, next) => {
    await next();
    if (ctx.status === 404) {
        // ctx.redirect('/404.html');
        // TODO make better
        let notFoundResponse = await request(`http://${ctx.req.headers.host}/404.html`)
        ctx.response.body = notFoundResponse.body;
        ctx.response.status = 404;
    }
};

module.exports = middleware;
