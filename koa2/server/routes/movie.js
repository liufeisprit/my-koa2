/**
 * movie下的路由
 */
const Router=require('koa-router')
const {getAllMovies,getRelativeMovies,getMovieDetail}=require('../service/movie')
const {get,post,put,del,controller} =require('../lib/decorator')
@controller('/v0/api/movies')
export class movieController{
    @get('/')
    async getMovies (ctx,next){
        const {type,year}=ctx.query;
        const movies=await getAllMovies(type,year);
        ctx.body={
            movies
        }
    }
    @get('/:id')
    async getMovieDetail(ctx,next){
        const id=ctx.params.id;
        const movie=await getMovieDetail(id)
        const relativeMovies=await getRelativeMovies(movie)
        ctx.body={
            data:{
                movie,
                relativeMovies
            },
            success:true
        }
    }
}