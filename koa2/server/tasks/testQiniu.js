const rp=require('request-promise-native')

;(async ()=>{
    const res=await rp(`https://rs.qbox.me//buckets`)
    let body;
    try {
        body=JSON.parse(res)
    } catch (error) {
        console.log(error)
    }
    console.log(body)
})
