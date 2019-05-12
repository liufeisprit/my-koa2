import Koa from 'koa'
const app=new Koa()
import html from './tpl/html'
import ejs from 'ejs'
import koaViews from 'koa-views'
import path from 'path'
app.use(koaViews(path.join(__dirname, './tpl'), {
    extension: 'pug'
  }));
app.use(async (ctx,next)=>{
    ctx.type='text/html; charset=utf-8'
    await ctx.render('index',{arr:[1,2,3,4],content:'<h1>标题</h1>',you:'candy',me:'liufei'})
})
console.log('node start')
app.listen(2333)