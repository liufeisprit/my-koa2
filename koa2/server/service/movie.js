const mongoose=require('mongoose')
const Movie=mongoose.model('Movie')
export const getAllMovies=async (type,year)=>{
    let query={}
    if(type){
        query.movieTypes={
            $in:[type]
        }
    }
    if(year){
        query.year=year
    }
    const movies=await Movie.find(query)
    return movies
}
export const findAndRemove=async id=>{
    const mo=await Movie.findOne({_id:'12314'})
    console.log(mo)
    return
    const removeMovie=await Movie.findOneAndDelete({id:id})
    return removeMovie 
}
export const getMovieDetail=async id=>{
    const movie=await Movie.findOne({_id:id})
    return movie
}
export const getRelativeMovies=async movie=>{
    const movies=await Movie.find({
        movieTypes:{
            $in:movie.movieTypes
        }
    })
    return movies
}