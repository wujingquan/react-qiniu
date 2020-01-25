const Koa = require('koa');
const server = require('koa-static');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const qiniu = require('qiniu');

const app = new Koa();
const router = new Router();

router.post('/action', (ctx, next) => {
  const {
    ak,
    sk,
    bk,
    ex
  } = ctx.request.body
  ctx.body = action(ak, sk, bk, ex);
});

function action(ak = '', sk = '', bk = '', ex = 180) {
  const options = {
    scope: bk,
    expires: 7200 * 24 * Number(ex)
  };
  const mac = new qiniu.auth.digest.Mac(ak, sk);
  const putPolicy = new qiniu.rs.PutPolicy(options);
  const uploadToken = putPolicy.uploadToken(mac);
  return uploadToken;
}

app
  .use(bodyParser())
  .use(server(__dirname + '/public'))
  .use(router.routes())
  .use(router.allowedMethods())
  .listen(3000);

