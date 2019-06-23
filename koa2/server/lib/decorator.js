const {resolve}=require('path')
const glob=require('glob')
const Router=require('koa-router')
const symbolPrefix=Symbol('prefix')
const routerMap=new Map()
const isArray=c=>Object.prototype.toString.call(c)==='[object Array]'?c:[c]
export class Route{
    constructor(app,apiPath){
        this.app=app;
        this.apiPath=apiPath
        this.router=new Router()
    }
    init(){
        glob.sync(resolve(this.apiPath,'./**/*.js')).forEach(require);
        for(let [conf,controller] of routerMap){
            const controllers=isArray(controller)
            var prefixPath=conf.target[symbolPrefix]
            if(prefixPath)prefixPath=normalizePath(prefixPath)
            const routerPath=prefixPath+conf.path
            this.router[conf.method](routerPath,...controllers)
        }
        this.app
        .use(this.router.routes())
        .use(this.router.allowedMethods())
    }
}
const normalizePath=path=>path.startsWith('/')?path:`/${path}`
const router=conf=>(target,key,desciptor)=>{
    conf.path=normalizePath(conf.path)
    routerMap.set({
        target:target,
        ...conf
    },target[key])
}
export const controller= path=>target=>(target.prototype[symbolPrefix]=path)
export const get= path=>router({
    method:'get',
    path:path
})
export const post= path=>router({
    method:'post',
    path:path
})
export const put= path=>router({
    method:'put',
    path:path
})
export const del= path=>router({
    method:'del',
    path:path
})
export const use= path=>router({
    method:'use',
    path:path
})
export const all= path=>router({
    method:'all',
    path:path
})