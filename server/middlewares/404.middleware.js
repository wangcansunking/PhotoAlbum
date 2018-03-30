let middleware = async (ctx, next) => {
    await next();
    if (ctx.status === 404) {
        ctx.redirect('/404.html');
    }
};

module.exports = middleware;