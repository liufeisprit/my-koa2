const rp=require('request-promise-native')
const url='http://1010.ytdk.chixintech.cn/live/robots/1010'
const url2='http://1010.ytdk.chixintech.cn/live/userlist/1010'
const fs=require('fs')
const {resolve}=require('path')
const mongoose=require('mongoose')
const DB_URL = 'mongodb://localhost:27017/cheater'
const {connect}=require('../server/database/index')
require('./userSchema')
const User=mongoose.model('UserList')
//?page=1&_=1559287489176'
var timeTemp=Date.now()
let page=0
let robots_num=0,user_num=0;
const sleep = time => new Promise(resolve => {
    setTimeout(resolve, time)
  })
function requestUrl(page){
    let requrl=`${url2}?page=${page}&_=${timeTemp}`
    console.log(requrl)
    let res=rp(requrl)
    return res
}
async function fetchRobots(){
    
    page++;
    await sleep(1000)
    let res=await requestUrl(page)
    let {robots}=JSON.parse(res)
    robots_num+=Number(robots.length);
    console.log(robots_num,page,robots[0])
    return;
    if(robots.length<15){
        console.log('robots_num is ' + robots_num)
        return;
    }
    fetchRobots()
}
async function fetchUser(){
    page++;
    await sleep(1000)
    let res=await requestUrl(page)
    let {list}=JSON.parse(res)
    user_num+=Number(list.length);
    console.log(user_num,page)
    // return;
    list.map(async item=>{
        let userItem=await User.findOne({
            uid:item.uid
        })
        if(!userItem){
            userItem=new User(item)
            await userItem.save()
        }
        // let data=`${JSON.stringify(item)}\n`
        // await fs.appendFile(resolve(__dirname,'userlist.txt'),data,(err)=>{
        //     if(err){console.log('写入失败')}
        // })
    })
    
    if(list.length<50){
        console.log('user_num is ' + user_num)
        return;
    }
    fetchUser()
}
;(async ()=>{
    // fetchRobots()
    await connect(DB_URL)
    
    fetchUser()
})()