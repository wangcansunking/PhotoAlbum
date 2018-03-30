const fs = require('fs');
const Koa = require('koa');
const Logger = require('koa-logger');
const Body = require('koa-body');
const Router = require('koa-router');

const app = new Koa();
const logger = new Logger();
const body = new Body();
const router = new Router({
    prefix: '/rest'
});

const REST_FOLDER = `${__dirname}/rests/`;
const MIDDLEWARE_FOLDER = `${__dirname}/middlewares/`;

app.use(logger);
app.use(body);

useRouter();
addMiddleware();

app.listen(3000);

console.log('Server starts on 3000');

function useRouter() {
    const restFiles = fs.existsSync(REST_FOLDER) && fs.readdirSync(REST_FOLDER);

    if (restFiles && restFiles.length > 0) {
        restFiles.forEach(file => router.use(require(`${REST_FOLDER}${file}`).routes()));
    }

    app.use(router.routes()).use(router.allowedMethods());
}

function addMiddleware() {
    const middlewareFiles = fs.existsSync(MIDDLEWARE_FOLDER) && fs.readdirSync(MIDDLEWARE_FOLDER);

    if (middlewareFiles && middlewareFiles.length > 0) {
        middlewareFiles.forEach(file => {
            const middleware = require(`${MIDDLEWARE_FOLDER}${file}`);
            if (middleware) {
                app.use(middleware)
            }
        });
    }

}
