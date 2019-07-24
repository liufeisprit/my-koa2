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
        body=JSON.parse(res)
    } catch (error) {
        console.log(error)
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
    //对爬取到的数据精加工 通过豆瓣api 拿到详细数据 存到数据库
     ;(async ()=>{
        let movies=await Movie.find({
            $or:[
                {summary:{$exists:false}},
                {summary:null},
                {year:{$exists:false}},
                
                {title:''},
                {summary:''},
            ]
        })
        console.log(movies.length)
        //遍历需要加工的数据
        for(var i=0;i<movies.length;i++){
            let moviesItem=movies[i];
            //请求豆瓣api
            let movieData=await fetchMovie(moviesItem)
            if(movieData){
                let {tags}=movieData||[]
                tags.forEach(item=>{
                    if(moviesItem.tags.indexOf(item.name)===-1)
                    moviesItem.tags.push(item.name)
                })
                moviesItem.summary=movieData.summary||''
                moviesItem.title=movieData.alt_title||movieData.title||''
                moviesItem.rawTitle=movieData.title||''
                if(movieData.attrs){
                    let MoveiDataAttrs=movieData.attrs
                    moviesItem.movieTypes=MoveiDataAttrs.movie_type||[]
                    moviesItem.director=MoveiDataAttrs.director
                    moviesItem.year=MoveiDataAttrs.year[0]||2500
                    let dates=MoveiDataAttrs.pubdate||[];
                    let pubdate=[]
                    dates.forEach(item=>{
                        if(item&&item.split(')').length>0){
                            let parts=item.split('(')
                            let date=parts[0]
                            let country='未知'
                            parts[1]&&(country=parts[1].split(')')[0])
                            pubdate.push({
                                date:new Date(date),
                                country
                            })
                        }
                    })
                    moviesItem.pubdate=pubdate
                    //movie_type 电影类型 
                    //里面有异步操作 不要用forEach(async ()=>)等方法
                    
                    for(var j=0;j<moviesItem.movieTypes.length;j++){
                        console.log(`movieTypes 长度${moviesItem.movieTypes.length}`)
                        let item=moviesItem.movieTypes[j]
                        let cat=await Category.findOne({
                            name:item
                        })
                        if(!cat){
                            cat=new Category({
                                name:item,movies:[moviesItem._id]
                            })
                        }else{
                            //如果分类下没有该电影id push一条
                            if(cat.movies.indexOf(moviesItem._id)===-1){
                                cat.movies.push(moviesItem._id)
                            }
                        }
                        await cat.save()
                        if(!moviesItem.category.length){
                            moviesItem.category.push(cat._id)
                        }else{
                            //如果category中没有该电影的分类_id push一条
                            if(moviesItem.category.indexOf(cat._id)===-1)
                            moviesItem.category.push(cat._id)
                        }
                    }
                }
                console.log(moviesItem)
                await moviesItem.save()
                
            }
        }
        console.log('修改结束')
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