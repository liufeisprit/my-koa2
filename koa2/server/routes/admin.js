
/**
 * movie下的路由
 */
const Router=require('koa-router')
const {checkPassword,registerUser}=require('../service/user')
const {get,post,put,del,controller,auth,adminAuth,Required} =require('../lib/decorator')
@controller('/admin')
export class adminController{
    @get('/movie/list')
    @auth
    @adminAuth
    async getMovieList(ctx,next){
        const {type,year}=ctx.query;
        const movies=await getAllMovies(type,year);
        ctx.body={
            data:movies,
            success: true
        }
    }
    @post('/login')
    @Required({
        body:['email','password']
    })
    // @auth
    async login (ctx,next){
        const {email,password}=ctx.request.body;
        const matchData=await checkPassword(email,password)
        console.log(matchData)
        if(!matchData.user){
            return (ctx.body={
                success:false,
                err:'用户不存在'
            })
        }
        if(matchData.match){
            return (ctx.body={
                success:true
            })
        }
        return (ctx.body={
            success:false,
            err:'密码不正确'
        })
        
    }
    @post('/register')
    async register(ctx,next){
        const {email,password}=ctx.request.body;
        const matchData=await registerUser(email,password)
        if(matchData.isExist){
            return (ctx.body={
                success:false,
                err:'用户已注册'
            })
        }
        if(matchData.match){
            return (ctx.body={
                success:true
            })
        }
    }
}