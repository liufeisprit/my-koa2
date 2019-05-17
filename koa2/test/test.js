// setTimeout(()=>{
//     console.log('timer1')
//     Promise.resolve().then(function() {
//         console.log('promise1')
//     })
// }, 0)

// setTimeout(()=>{
//     console.log('timer2')
//     Promise.resolve().then(function() {
//         console.log('promise2')
//     })
// }, 0)
const {readFile,readFileSync} = require('fs')
const {resolve}=require('path')
setImmediate(()=>console.log('setImmediate回调2'))
readFileSync(resolve(__dirname,'../test.txt'),'utf-8',data=>{
    console.log('阶段2 IO操作 读文件回调1')
})
setImmediate(()=>console.log('setImmediate回调1'))