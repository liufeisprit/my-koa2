const Koa=require('koa')
const koaSession=require('koa-session')
import logger from 'koa-logger'
const app=new Koa()
// const mid1=async (ctx,next)=>{ 
//     ctx.body='Hi';
//     await next()
//     ctx.body=ctx.body+' There';
// }
// const mid2=async (ctx,next)=>{
//     ctx.type='text/html; charset=utf-8'
//     await next()
// }
// const mid3=async (ctx,next)=>{
//     ctx.body=ctx.body+' Luke';
//     await next()
// }
app.keys = ['liufei123'];
app.use(logger())
app.use(koaSession(app));
// app.use(mid1).use(mid2).use(mid3)
app.use(ctx => {
    // ignore favicon
    if (ctx.path === '/favicon.ico') return;
    if(ctx.path === '/'){
        let n = ctx.session.views || 0;
        ctx.session.views = ++n;
        ctx.body = n + ' views';
    }else if(ctx.path==='/hi'){
        ctx.body = ' Luke';
    }else{
        ctx.throw(404,'sb')
        
    }
  });
app.listen(2333)
// app