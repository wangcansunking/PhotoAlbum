const PATH = '/example';

const exampleRouter = new require('koa-router')();

module.exports = exampleRouter;

exampleRouter
    .get(PATH, (ctx, next) => {
        ctx.body = {
            method: 'get'
        };
        next();
    })
    .post(PATH, (ctx, next) => {
        ctx.body = {
            method: 'post'
        };
        next();
    })
    .delete(PATH,(ctx, next) => {
        ctx.body = {
            method: 'delete'
        };
        next();
    })
    .put(PATH,(ctx, next) => {
        ctx.body = {
            method: 'put'
        };
        next();
    });