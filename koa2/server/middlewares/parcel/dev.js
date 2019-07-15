const Bundler=require('parcel-bundler')
const views = require('koa-views')
const serve=require('koa-static')
const {resolve}=require('path')
const r=path=>resolve(__dirname,path )
const bundler=new Bundler(r('../../../src/index.html'),{
    publicUrl:'/',
    watch:true,
    outDir: './parcelDist',
    cache: false
})
export const dev=async app=>{
    await bundler.bundle()
    console.log('打包完毕')
    app.use(serve(r('../../../parcelDist')))
    app.use(views(r('../../../parcelDist')),{
        extension:'html'
    })
    app.use(async (ctx)=>{
        await ctx.render('index.html')
    })
}