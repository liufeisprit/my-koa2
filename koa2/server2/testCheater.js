const rp=require('request-promise-native')
const urlRobots='http://1010.ytdk.chixintech.cn/live/robots/1010'
const urlUserlist='http://1010.ytdk.chixintech.cn/live/userlist/1010'
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
function requestUrl(page,url){
    let requrl=`${url}?page=${page}&_=${timeTemp}`
    console.log(requrl)
    let res=rp(requrl)
    return res
}
async function fetchRobots(){

    let num=11;
    let resultArr=[1,2,3,4,5,6,7,8,9,10,]
    console.time('程序耗时')
    // for(var i of resultArr){
    //     let robotsArr=await requestUrl(i,urlRobots)
    //     robotsArr=JSON.parse(robotsArr)
    // }
    resultArr.map(async item=>{
        await requestUrl(item,urlRobots)
    })
    console.timeEnd('程序耗时')
    console.log('Finished!');
    // Promise.all(resultArr)
    // page++;
    // await sleep(1000)
    // let res=await requestUrl(page,urlRobots)
    // let {robots}=JSON.parse(res)
    // robots_num+=Number(robots.length);
    // console.log('page=>'+page+'robots_num=>' + robots_num)
    // if(robots.length<15){
    //     console.log('robots_num is ' + robots_num)
    //     return;
    // }
    // fetchRobots()

}
 function getItemList(item){
    return new Promise(async res=>{
        let userItem=await User.findOne({
            uid:item.uid
        })
        if(!userItem){
            userItem=new User(item)
            await userItem.save()
        }
        res()
    })
    
}

async function fetchUser(){
    
    page++;
    await sleep(1000)
    let res=await requestUrl(page,urlUserlist)
    let {list}=JSON.parse(res)
    user_num+=Number(list.length);
    console.log(user_num,page)
    let index=0;
    let results=list.map(async item=>{
           
            let userItem=await User.findOne({
                uid:item.uid
            })
            if(!userItem){
                console.log('有新用户')
                userItem=new User(item)
                await userItem.save()
            }
    })
    console.log(results)
    console.time('promiseAll时间')
    let PromiseAllRes=await Promise.all(
        // list.map(async item=>{
           
        //     let userItem=await User.findOne({
        //         uid:item.uid
        //     })
        //     if(!userItem){
        //         console.log('有新用户')
        //         userItem=new User(item)
        //         await userItem.save()
        //     }
        //     index++;
        //     // console.log(index)
        //     // return Promise.resolve()
        // // let data=`${JSON.stringify(item)}\n`
        // // await fs.appendFile(resolve(__dirname,'userlist.txt'),data,(err)=>{
        // //     if(err){console.log('写入失败')}
        // // })
        // })
        results
    )
    console.timeEnd('promiseAll时间')
    return 'end'
    if(list.length<50){
        console.log('请求结束 user_num is ' + user_num)
        return ;
    }
    fetchUser()
}

async function test(){
    let userItem=await User.find({},{uid:1,_id:0}).limit(10)
    console.time('程序耗时')
    // for(var item of userItem){
    //     await User.findOne({
    //         uid:item.uid
    //     })
    // }
    await Promise.all(userItem.map(item=>{
        return User.findOne({
            uid:item.uid
        })
    }))
    console.timeEnd('程序耗时')
}
;(async ()=>{
    // fetchRobots()
    await connect(DB_URL)
    
    // await fetchUser()
    // await fetchRobots()
    await test()

    
})()
    // for(var item of userItem){
    //     await User.findOne({
    //         uid:item.uid
    //     })
    // }
     // await Promise.all(userItem.map(async item=>{
    //     let user=await User.findOne({
    //         uid:item.uid
    //     })
    //     return user
    // }))