const fs=require('fs');
const util=require('util')
const co=require('co')
function readFile(cb) {
    fs.readFiles('./package.json',(err,data)=>{
        if(err) return cb(err)
        cb&&cb(null,data)
    })
}
//回调函数实现异步
readFile((err,data)=>{
    if(!err){
        data=JSON.parse(data)
        console.log('callback')
        // console.log(data)
    }
})
//promise
function readFileAsync(path) { 
    return new Promise((resolve,reject)=>{
        fs.readFile(path,(err,data)=>{
            if(err) reject(err)
            else resolve(data)
            
        })
    })
 }
 readFileAsync('./package.json')
    .then(data=>{
        data=JSON.parse(data)
        // console.log(data.name)
        console.log('Promise')
    })
    .catch(err=>{
        console.log(err)
    })
//第三阶段 generator co
co(function *() {
    let data=yield util.promisify(fs.readFile)('./package.json');
    data=JSON.parse(data)
    // console.log(data)
    console.log('co')
})
//第四阶段 async 
const readAsync = util.promisify(fs.readFile)
async function init() {
    let data=await readAsync('./package.json')
    data=JSON.parse(data)
    console.log('async')
    // console.log(data)
}
init()