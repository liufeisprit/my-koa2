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
    
    let arr=await queryModel('select *  from cheater')
    console.log(arr.length)
    //     console.time('forof程序耗时')
    // for(var item of robotsItem){
    //     // console.log(Date.now())
    //     await Robots.findOne({
    //         uid:item.uid
    //     })
    // }
    // })
    // let query1='select * from customers'
    // let result=await queryModel(query1)
    // console.time('程序耗时1')
    // // let forResult=[]
    // for(var item of result){
    //     await queryModel(`select * from customers where cust_Id=${item.cust_Id}`)
    //     // queryModel(`select * from customers where cust_Id=${item.cust_Id}`)
    // }
    // // console.log(forResult)
    // console.timeEnd('程序耗时1')
    // console.log('================================')
    // console.time('程序耗时2')
    // await Promise.all(result.map(item=>{
    //     // return requestUrl(1,urlRobots)
    //     return queryModel(`select * from customers where cust_Id=${item.cust_Id}`)
               
    // }))
    // // console.log(promiseResult)
    // console.timeEnd('程序耗时2')   
}
async function test() { 
    let query1='select * from cheater'
    let result=await queryModel(query1)
    console.log('===============================')
    // console.log(result)
    console.time('程序耗时1')
    for(var item of result){
        await queryModel(`select * from cheater where uid=${item.uid}`)
    }
    // console.log(forResult)
    console.timeEnd('程序耗时1')
    console.log('================================')
    console.time('程序耗时2')
    let promiseResult=await Promise.all(result.map(item=>{
        // return requestUrl(1,urlRobots)
        return queryModel(`select * from cheater where uid=${item.uid}`)
               
    }))
    console.log(promiseResult.length)
    console.timeEnd('程序耗时2')
 }
;(async ()=>{
    // create table tb_dept(
    //     9     Id int primary key auto_increment,#部门编号 整形 主键 自增长
    //    10     Name varchar(18),#部门名称
    //    11     description varchar(100)#描述
    //    12 );
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
    // await fetchRobots()
    test()
})()
