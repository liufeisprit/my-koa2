const fs=require('fs')
const EventEmitter=require('events')
class EE extends EventEmitter{}
const yy=new EE()
yy.on('event',()=>{
    console.log('粗大事了！')
})
setTimeout(()=>{
   console.log('0秒后执行的定时器回调') 
},0)
setTimeout(()=>{
    console.log('100秒后执行的定时器回调') 
 },100)
 setTimeout(()=>{
    console.log('200秒后执行的定时器回调') 
 },200)
 fs.readFile('../package.json','utf-8',data=>{
     console.log('读取文件完成1后的回调')
 })
 fs.readFile('../receiveInfo.txt','utf-8',data=>{
    console.log('读取文件完成2后的回调')
})
setImmediate(()=>{
    console.log('setImmediate立即回调')
})
process.nextTick(()=>{
    console.log('process nextTick 回调')
})
Promise.resolve().then(
    ()=>{
        yy.emit('event');
        process.nextTick(()=>{
            console.log('process nextTick 第二次 回调')
        })
        console.log("promise的第一次回调")
    }
).then(()=>{
    console.log("promise的第二次回调")

})