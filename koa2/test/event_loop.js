const {readFile,readFileSync} = require('fs')
const {resolve}=require('path')
setImmediate(()=>console.log('阶段3 immediate 回调1'))
setImmediate(()=>console.log('阶段3 immediate 回调2'))
setImmediate(()=>console.log('阶段3 immediate 回调3'))
Promise.resolve().then(()=>{
    console.log('待切入下一个阶段 promise回调1')
    setImmediate(()=>console.log('阶段3 immediate promise增加的immediate回调4'))
})
readFileSync(resolve(__dirname,'../test.txt'),'utf-8',data=>{
    console.log('阶段2 IO操作 读文件回调1')
})
readFile('../package-lock.json','utf-8',data=>{
    console.log('阶段2 IO操作 读文件回调2')
    setImmediate(()=>console.log('阶段3 immediate 读文件回调2  增加的回调4'))
})
setImmediate(()=>{
    console.log('阶段3 immediate 回调4')
    Promise.resolve().then(()=>{
        console.log('待切入下一个阶段 promise回调2')
        process.nextTick(()=>{
            console.log('待切入下一个阶段 promise回调2 增加的nextick 回调5')
        })
    }).then(()=>{
        console.log('待切入下一个阶段 promise回调3')
    })
    process.nextTick(()=>{console.log('immeditate4 增加nexttick回调')})
})
setImmediate(()=>{
    console.log('阶段3 immediate 回调5')
    process.nextTick(()=>{
        console.log('待切入下一个阶段 setImmediate回调5 增加的nextick 回调6')
        console.log('待切入下一个阶段 正在读一个大文件')
        const packagejson=readFileSync(resolve(__dirname,'../package-lock.json'),'utf-8')
        process.nextTick(()=>{
            console.log('待切入下一个阶段 setImmediate回调5 增加的nextick 回调7')
        })
        readFile(resolve(__dirname,'../package.json'),'utf-8',data=>{
            console.log('阶段2 IO回调 读文件回调2')
            setImmediate(()=>{
                console.log('阶段3 immediate 回调 读文件回调2 增加的 Immediate 回调6')
                setTimeout(()=>console.log('阶段1 定时器 定时器回调8'),0)
            })
           
        })
        
        
    })
    process.nextTick(()=>{
        console.log('待切入下一个阶段 读文件回调5 增加的nextick 回调6')
    })
    setTimeout(()=>console.log('阶段1 定时器回调 6'),0)
    setTimeout(()=>console.log('阶段1 定时器回调 7'),0)
})
setTimeout(()=>console.log('阶段1 定时器回调 1'),0)
setTimeout(()=>{
    console.log('阶段1 定时器回调2')
    process.nextTick(()=>{
        console.log('切入下个阶段 nexttick回调 5')
    })
},0)
setTimeout(()=>console.log('阶段1 定时器回调 3'),0)
setTimeout(()=>console.log('阶段1 定时器回调 4'),0)

process.nextTick(()=>{console.log('切入下个阶段 nexttick回调 1')})
process.nextTick(()=>{
    console.log('切入下个阶段 nexttick回调 2')
    process.nextTick(()=>{console.log('切入下个阶段 nexttick回调 4')})
})
process.nextTick(()=>{console.log('切入下个阶段 nexttick回调 3')})
