
/**
 * movie下的路由
 */
const Router=require('koa-router')
const {checkPassword,registerUser}=require('../service/user')
const {getAllMovies,findAndRemove}=require('../service/movie')
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
                errMsg:'用户不存在'
            })
        }
        if(matchData.match){
            ctx.session.user={
                _id:matchData.user._id,
                email:matchData.user.email,
                role:matchData.user.role,
                username:matchData.user.username
            }
            return (ctx.body={
                success:true
            })
        }
        return (ctx.body={
            success:false,
            errMsg:'密码不正确'
        })
        
    }

    @del('/movie')
    @Required({
        query:['id']
    })
    async remove(ctx,next){
        const id=ctx.query.id
        const removeMovie=await findAndRemove(id)
        console.log(removeMovie)
        if(removeMovie){
             return ctx.body={
                success:true,
                errMsg:'删除成功'
            }
        }
        return ctx.body={
            success:false,
            errMsg:'删除失败'
        }
        
    }
    @post('/register')
    async register(ctx,next){
        const {email,password}=ctx.request.body;
        const matchData=await registerUser(email,password)
        if(matchData.isExist){
            return (ctx.body={
                success:false,
                errMsg:'用户已注册'
            })
        }
        if(matchData.match){
            ctx.session.user={
                _id:matchData.user._id,
                email:matchData.user.email,
                role:matchData.user.role,
                username:matchData.user.username
            }
            return (ctx.body={
                success:true
            })
        }
    }
}