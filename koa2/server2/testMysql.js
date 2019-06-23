const rp=require('request-promise-native')
const urlRobots='http://1010.ytdk.chixintech.cn/live/robots/1010'
const urlUserlist='http://1010.ytdk.chixintech.cn/live/userlist/1010'
const fs=require('fs')
const {resolve}=require('path')
const queryModel=require('./mysqlQuery.js')
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
    page++;
    await sleep(1000)
    let res=await requestUrl(page,urlRobots)
    let {robots}=JSON.parse(res)
    // return
    robots.map(async (item)=>{
        let robot=await queryModel(`select * from cheater where uid =${item.uid}`)
        if(!robot.length){
            console.log('有新用户')
            let result=[]
            let str=['uid','room_id','name','type','created_at','updated_at']
            for(var i in item){
                if(str.includes(i)){
                    result.push(item[i])
                }
                // console.log('==================')
            }
            // console.log(result)
            let query1=`insert into cheater (uid,room_id,name,type,created_at,updated_at) values (?,?,?,?,?,?)`
            await queryModel(query1,result)
        }
    }) 
}
async function test(){
    let result=await queryModel('select *  from cheater')
    console.time('程序计时for循环')
    for(var item of result){
        await queryModel(`select * from cheater where uid=${item.uid}`)
    }
    console.timeEnd('程序计时for循环')
    console.time('程序计时promise.all')
    await Promise.all(result.map(item=>{
        return queryModel(`select * from cheater where uid=${item.uid}`)
    }))
    console.timeEnd('程序计时promise.all')
}
;(async ()=>{
    // await queryModel('DROP TABLE if  exists cheater')
    let createTable=`create table  if not exists  cheater (
        uid int primary key,
        room_id int(10) not null,
        name char(50),
        type char(10),
        created_at varchar(255),
        updated_at varchar(255)
     ) default charset=utf8`
    await queryModel(createTable)
    await test()
    // await fetchRobots()
})()
