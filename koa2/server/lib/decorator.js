const {resolve}=require('path')
const glob=require('glob')
const Router=require('koa-router')
const symbolPrefix=Symbol('prefix')
const routerMap=new Map()
import R from 'ramda'
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
        console.log('routerMap==>',routerMap)
        for(let [conf,controller] of routerMap){
            const controllers=isArray(controller)
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
//装饰器 target类的原型 key当前属性的名字 desciptor装饰的对象的描述对象 writable enumerable configurable等
const router=conf=>(target,key,desciptor)=>{
    conf.path=normalizePath(conf.path)
    routerMap.set({
        target:target,
        ...conf
    },target[key])
}
//类的装饰器 把类的原型上绑定前缀 path ex: adminController这个class 原型上就绑定了 symbolPrefix=path
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
export const del = path=>router({
    method:'delete',
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
//unless 判断输入值是否满足 predicate，若不符合，
//则将输入值传给 whenFalseFn 处理，并将处理结果作为返回；若符合，则将输入值原样返回。
//R.of将传入的值封装成单元素数组 2=>[2]
const changeToArr = R.unless(
    R.is(Array),
    R.of
  )
const convert=middleware=>(target,key,desciptor)=>{
    target[key]=R.compose(
        R.concat(
            changeToArr(middleware)
        ),changeToArr
    )(target[key])
    console.log('target',target[key].toString())
    return desciptor
}

export const Required=paramsObj=>convert(async (ctx,next)=>{
    let errors=[]
    R.forEachObjIndexed(
        (val,key)=>{
            errors=errors.concat(
                R.filter(
                    name=>!R.has(name,ctx.request[key])
                )(val)
            )
        }
    )(paramsObj)
    if(!R.isEmpty(errors)){
        return (
            ctx.body={
                success:false,
                errCode:412,
                errMsg:`${R.join(', ',errors)} is required`
            }
        )
    }
    await next()
})
export const auth = convert (async (ctx,next)=>{
    console.log('session',ctx.session.user)
    if(!ctx.session.user){
        return (
            ctx.body={
                success:false,
                code:401,
                errMsg:'登录信息失效 请重新登录'
            }
        )
    }
    await next()
}) 
export const adminAuth = convert(async (ctx,next)=>{
    const {role}=ctx.session&&ctx.session.user
    if(!role||role!=='admin'){
        return (
            ctx.body={
                success:false,
                code:403,
                errMsg:'你没有权限 来错地方了'
            }
        )
    }
    await next()
}) 