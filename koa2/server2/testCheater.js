const rp=require('request-promise-native')
const url='http://1010.ytdk.chixintech.cn/live/robots/1010'
const url2='http://1010.ytdk.chixintech.cn/live/userlist/1010'
//?page=1&_=1559287489176'
let page=0
let robots_num=0;
const sleep = time => new Promise(resolve => {
    setTimeout(resolve, time)
  })
function requestUrl(page){
    let requrl=`${url}?page=97_${Date.now()}`
    console.log(requrl)
    let res=rp(requrl)
    return res
}
async function fetchData(){
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
    fetchData()
}
;(async ()=>{
    fetchData()
})()