// http://api.douban.com/v2/movie/subject/26835471
const rp=require('request-promise-native')
const mongoose = require('mongoose')
const Movie=mongoose.model('Movie')
async function fetchMovie(item) {
    const url=`http://api.douban.com/v2/movie/subject/${item.doubanid}`
    const res=await rp(url)
    return res
}
const movies=[{ doubanid: 25982742,
    title: '女儿',
    rate: 6.3,
    img:
     'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2281641852.jpg' },
  { doubanid: 25786077,
    title: '末日崩塌',
    rate: 7,
    img:
     'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2247341513.jpg' },
  { doubanid: 3592854,
    title: '疯狂的麦克斯4：狂暴之路',
    rate: 8.6,
    img:
     'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2236181653.jpg' },
  { doubanid: 24712052,
    title: '回溯',
    rate: 6.1,
    img:
     'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2312174926.jpg' },
  { doubanid: 24846487,
    title: 'Skin Deep',
    rate: 7.7,
    img:
     'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2446879524.jpg' }]

     ;(async ()=>{
        let movies=await Movie.find({
            $or:[
                
            ]
        })
     })()
     
movies.forEach(async item=>{
    console.log(item.title)
    var res=await fetchMovie(item)
    try {
        console.log(item.title)
        res=JSON.parse(res);
        console.log(res.summary)
        console.log('\n')
    } catch (error) {
        console.log(error)
    }
})