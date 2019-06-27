
import {promisify} from 'util'
import {resolve as r} from 'path'
import {readFile , writeFileSync as wfs} from 'fs'
// import * as qs from 'querystring'
// promisify(readFile)(r(__dirname,'../package.json'))
//     .then(data=>{
//         data=JSON.parse(data)
//         console.log(data.name)
//         wfs(r(__dirname,'./name'),String(data.name),'utf-8')
//     })
// import {name} from './ex'
//import会提升到顶部 被import的js会第一次执行一遍
console.log(Date.now()+'index.js')
console.log(getName3()+'fe')
// import {getName} from './ex'
// import  age from './ex'
import {
    name2 as name3,
    getName2 as getName3,
    age2 as age3
} from './ex'
// console.log(name)
console.log(getName3())
console.log(r(__dirname,))
async function init() {
    let data=await promisify(readFile)(r(__dirname,'../package.json'))
    data=JSON.parse(data)
    console.log(data.name)
}
init()