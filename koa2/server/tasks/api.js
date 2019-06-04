// http://api.douban.com/v2/movie/subject/26835471
const rp=require('request-promise-native')
const mongoose = require('mongoose')
const Movie=mongoose.model('Movie')
const Category=mongoose.model('Category')
async function fetchMovie(item) {
    const url=`https://douban.uieee.com/v2/movie/${item.doubanId}`
    const res=await rp(url)
    let body;
    try {
        body=JSON.parseres()
    } catch (error) {
        console.log(body)
    }
    return body
}
// const movies=[{ doubanid: 25982742,
//     title: '女儿',
//     rate: 6.3,
//     img:
//      'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2281641852.jpg' },
//   { doubanid: 25786077,
//     title: '末日崩塌',
//     rate: 7,
//     img:
//      'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2247341513.jpg' },
//   { doubanid: 3592854,
//     title: '疯狂的麦克斯4：狂暴之路',
//     rate: 8.6,
//     img:
//      'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2236181653.jpg' },
//   { doubanid: 24712052,
//     title: '回溯',
//     rate: 6.1,
//     img:
//      'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2312174926.jpg' },
//   { doubanid: 24846487,
//     title: 'Skin Deep',
//     rate: 7.7,
//     img:
//      'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2446879524.jpg' }]

     ;(async ()=>{
        let movies=await Movie.find({
            $or:[
                {summary:{$exists:false}},
                {summary:null},
                {title:''},
                {summary:''}
            ]
        })
        for(var i=0;i<movies.length;i++){
            let moviesItem=movies[i];
            let movieData=fetchMovie(moviesItem)
            if(movieData){
                let {tags}=movieData||[]
                moviesItem.tags=tags||'';
                moviesItem.summary=movieData.summary||''
                moviesItem.title=movieData.alt_title||movieData.title||''
                moviesItem.original_title=movieData.title||''
                moviesItem.movieTypes=movieData.genres||[]
                moviesItem.pubdates=movieData.pubdates||[]
                moviesItem.year=movieData.year||''
                moviesItem.movieTypes.forEach(async item=>{
                    let cat=Category.findOne({
                        name:item
                    })
                    if(!cat){
                        cat=new Category({
                            name:item,movies:[moviesItem._id]
                        })
                    }else{
                        if(cat.movies.indexOf(moviesItem._id)===-1){
                            cat.movies.push(moviesItem._id)
                        }
                    }
                    await cat.save()
                    if(!movie.category){
                        movie.category.push(cat._id)
                    }else{
                        if(cat.category.indexOf(cat._id)===-1)
                        movie.category.push(cat._id)
                    }
                })
                
            }
        }
     })()
     
// movies.forEach(async item=>{
//     console.log(item.title)
//     var res=await fetchMovie(item)
//     try {
//         console.log(item.title)
//         res=JSON.parse(res);
//         console.log(res.summary)
//         console.log('\n')
//     } catch (error) {
//         console.log(error)
//     }
// })