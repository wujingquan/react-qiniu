const Koa = require('koa');
const server = require('koa-static');
const Router = require('koa-router');
const mount = require('koa-mount');

const app = new Koa();
const staticApp = new Koa();
const router = new Router();
const static = server(__dirname + '/public');


staticApp.use(static)

router.get('/', (ctx, next) => {
  ctx.body = 1
})

app
  .use(router.routes())
  .use(router.allowedMethods());
app
  .use(mount('/public', staticApp))
app.listen(3000);

