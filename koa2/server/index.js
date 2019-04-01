const Koa=require('koa')
const app=new Koa()
app.use(async (ctx,next)=>{
    ctx.type='text/html;charset=utf-8'
    ctx.body='hi koa'
}).listen(2333)
// app