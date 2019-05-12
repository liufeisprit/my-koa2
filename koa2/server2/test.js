const fs=require('fs')
const path=require('path')
//process.cwd() 是当前执行node命令时候的文件夹地址 
console.log(process.cwd())
// __dirname: 当前模块的目录名
console.log(__dirname)
//获取当前模块文件的带有完整绝对路径的文件名
console.log(__filename)
console.log(fs.realpathSync('server/index.js'))