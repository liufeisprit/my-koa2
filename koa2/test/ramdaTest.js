
import * as R from 'ramda'
import {resolve} from 'path'
const double = x => x * 2;

let result=R.map(double, [1, 2, 3]); //=> [2, 4, 6]
let addR=R.add(0.1, 0.2); 
let third_obj={}
const third_platform=(value,key)=>{
    // localStorage.setItem(key,value)
    console.log(123)
    return value
    third_obj[key]=value
}
// require(name=>resolve(__dirname,`../server/middlewares/${name}`))
R.forEachObjIndexed(third_platform)

console.log('map',R.map(x=>x+2)([1]))
//柯里化
console.log('curry',R.curry((a,b,c,d)=>a+b+c+d)(1)(2)(3)(4))
//允许函数最左边接收一个数组 作为最左边的部分参数 从左往右
console.log('partial',R.partial((a,b,c)=>a+b+c)([2,4])(4))
//作为最右边的部分参数 从右往左
console.log('partialRight',R.partialRight((a,b,c)=>a+b-c)([2,4])(4))
// pipe：将多个函数合并成一个函数，从左到右执行。
console.log('pipe',R.pipe(x=>x+2,x=>x+3)(1))
//compose 将多个函数合并成一个函数，从右到左执行。
console.log('compose',R.pipe(x=>x+2,x=>x+4)(1))

// console.log(testa.toString())
R.map(
    R.compose(
        name=>console.log(name),
        require,
        name=>resolve(__dirname,`../server/middlewares/${name}`)
    )
)(['router'])

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
    console.log('target',target[key][0])
    return desciptor
}
const auth=convert(async (ctx,next)=>{
    if(!ctx.name){
        return {
            err:'没名字不能说话'
        }
    }
    await next()
})
class People{
    @auth
    say(){
        console.log('I can say')
    }
}
console.log(R.compose(
    Math.abs,R.add(1)
)(-9))