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
        //执行所有路由所需的装饰器 这行代码执行完毕 routerMap上已经绑定了所有装饰器方法
        glob.sync(resolve(this.apiPath,'./**/*.js')).forEach(require);
        // console.log(routerMap)
        for(let [conf,controller] of routerMap){
            console.log('conf',conf)
            const controllers=isArray(controller)
            console.log('controller',controllers)
            var prefixPath=conf.target[symbolPrefix]
            if(prefixPath)prefixPath=normalizePath(prefixPath)
            const routerPath=prefixPath+conf.path
            //server端请求不同路由 执行不同方法
            //等同于 例如this.router.get('/admin',controllers) controllers可以是多个中间价 依次传递
            this.router[conf.method](routerPath,...controllers)
        }
        this.app
        .use(this.router.routes())
        .use(this.router.allowedMethods())
    }
}
const normalizePath=path=>path.startsWith('/')?path:`/${path}`
//装饰器 target类的原型 key当前属性的名字
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