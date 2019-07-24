
const qiniu = require('qiniu')
const mongoose = require('mongoose')
const nanoid = require('nanoid')
const config = require('../config')
const bucket = config.qiniu.bucket
var mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK);
var bucketManager = new qiniu.rs.BucketManager(mac, config);
const Movie = mongoose.model('Movie')

const uploadToQiniu = async (url, key) => {
  console.log('argument',url,key)
  return new Promise((resolve, reject) => {
    bucketManager.fetch(url, bucket, key, (err, ret, info) => {
      if (err) {
        reject(err)
      }
      else {
        if (info.statusCode === 200) {
          resolve({ key })
        } else {
          reject(info)
        }
      }
    })
  })
}

;(async () => {
    let movies = await Movie.find({
      $or: [
        {videoKey: {$exists: false}},
        {videoKey: null},
        {videoKey: ''}
      ]
    }).exec()
    // let movies=[{
    //     doubanId: 3927734,
    //     poster:'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2158676090.jpg',
    //     video:'http://vt1.doubanio.com/201907212348/3e2261f675f30eb48b3fd04d142c413c/view/movie/M/301450274.mp4',
    //     cover:'https://img3.doubanio.com/img/trailer/medium/2157204740.jpg?' 
    // }]
  
    console.log('videoKey',movies.length)
    for (let i = 0; i < movies.length; i++) {
      let movie = movies[i]
      
      if (movie.video && !movie.videoKey) {
        console.log('存到七牛上 movie的数据',movie.video,movie.cover,movie.poster)
        try {
          let videoData = await uploadToQiniu(movie.video, nanoid() + '.mp4')
          let coverData = await uploadToQiniu(movie.cover, nanoid() + '.png')
          let posterData = await uploadToQiniu(movie.poster, nanoid() + '.png')
  

          
  
          if (videoData.key) {
            movie.videoKey = videoData.key
          }
          if (coverData.key) {
            movie.coverKey = coverData.key
          }
          if (posterData.key) {
            movie.posterKey = posterData.key
          }
          console.log(movie)
          await movie.save()
        } catch (err) {
          console.log(err)
        }
      }
    }
  })()
//    puzvb5scj.bkt.clouddn.com 测试域名
//   { doubanId: 3927734,
//     poster:
//      'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p2158676090.jpg',
//     video:
//      'http://vt1.doubanio.com/201907212348/3e2261f675f30eb48b3fd04d142c413c/view/movie/M/301450274.mp4',
//     cover:
//      'https://img3.doubanio.com/img/trailer/medium/2157204740.jpg?',
//     videoKey: 'puzvb5scj.bkt.clouddn.com/zFXITSGpgeLHUXRhPjiEb.mp4',
//     coverKey: 'puzvb5scj.bkt.clouddn.com/UmO-FP3sJi4HooMlcTRkf.png',
//     posterKey: 'puzvb5scj.bkt.clouddn.com/XSsKhkuUwRrhAN6B6FYbx.png' }