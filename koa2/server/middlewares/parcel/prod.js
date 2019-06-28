const Bundler=require('parcel-bundler')
const views = require('koa-views')
const serve=require('koa-static')
const {resolve}=require('path')
const r=path=>resolve(__dirname,path )

export const prod=async app=>{
    app.use(serve(r('../../../parcelDist')))
    app.use(views(r('../../../parcelDist')),{
        extension:'html'
    })
    app.use(async (ctx)=>{
        await ctx.render('index.html')
    })
}