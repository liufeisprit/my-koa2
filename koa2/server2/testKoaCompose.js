// const compose=require('koa-compose')
function one(ctx,next){
    console.log('第一个');
    next(); // 控制权交到下一个中间件（实际上是可以执行下一个函数），
    // next(); 
    console.log('第一个 end')
}
function two(ctx,next){
    console.log('第二个');
    next();
    console.log('第二个 end')
}
function three(ctx,next){
    console.log('第三个');
    next();
    console.log('第三个 end')
}
// 传入中间件函数组成的数组队列，合并成一个中间件函数
const middlewares = compose([one, two, three]);
console.log(middlewares)
// 执行中间件函数,函数执行后返回的是Promise对象
const callback=middlewares()
console.log(callback)
// .then(function (){
//     console.log('队列执行完毕');    
// })

function compose (middleware) {
    return function (context, next) {
      let index = -1
      return dispatch(0)
      function dispatch (i) {
        if (i <= index) return Promise.reject(new Error('next() called multiple times'))
        index = i
        let fn = middleware[i]
        console.log('next============='+next)
        console.log(fn)
        if (i === middleware.length) fn = next
        if (!fn) return Promise.resolve()
        try {
          return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
        } catch (err) {
          return Promise.reject(err)
        }
      }
    }
  }