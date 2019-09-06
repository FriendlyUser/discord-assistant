/**
 * @author David Li
 * @file puppeter.ts wrapper around puppeter messages
 */

const Router = require('koa-router');
const router = new Router();

router.get('/puppeter', async (ctx: any) => {
  ctx.body = {
    status: 'success',
    message: 'hello, world!'
  };
})

export default router;
