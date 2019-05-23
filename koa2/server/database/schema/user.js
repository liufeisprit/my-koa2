const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const Schema=mongoose.Schema
const Mixed=Schema.Types.Mixed
const SALT_WORK_FACTORY=10
const MAX_LOGIN_ATTEMPTS=5
const LOCK_TIME=2*60*60*1000
const userSchema=new Schema({
    userName:{
        unique:true,//是否是唯一的
        type:String,
        required:true,
    },
    email:{
        unique:true,
        required:true,
        type:String,
    },
    password:{
        type:String,
    },
    loginAttempts:{
        type:Number,
        required:true,
        default:0,
    },
    lockUnitl:Number,
    meta:{
        createdAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type:Date,
            default:Date.now()
        }
    }
})
userSchema.virtual('isLocked').get(()=>{
    return !!(this.lockUnitl&&this.lockUnitl>Date.now())
})
//中间件 在保存前 执行的方法
userSchema.pre('save',(next)=>{
    if(!this.isModified('password')){return next()}
    bcrypt.getSalt(SALT_WORK_FACTORY,(err,salt)=>{
        if(err) return next(err)
        bcrypt.hash(this.password,salt,(err,hash)=>{
            if(err) return next(err)
            this.password=hash;
            next()
        })
    })
    if(this.isNew){
        this.meta.createdAt=this.meta.updateAt=Date.now()
    }else{
        this.meta.updateAt=Date.now()
    }
    next()
})
userSchema.methods={
    comparePassword:(_password,password)=>{
        return new Promise((resolve,reject)=>{
            bcrypt.compare(_password,password,(err,isMatch)=>{
                if(!err) return resolve(isMatch)
                else reject(err)
            })
        })
    },
    incLoginAttempts:(user)=>{
        return new Promise((resolve,reject)=>{
            if(this.lockUnitl&&this.lockUnitl>Date.now()){
                this.update({
                    $set:{
                        loginAttempts:1
                    },
                    $unset:{
                        lockUnitl:1
                    }
                },err=>{
                    if(!err) resolve(true)
                    else reject(err)
                })
            }else{
                let updates={
                    $inc:{
                        loginAttempts:1
                    }
                }
                if(this.loginAttempts+1>=MAX_LOGIN_ATTEMPTS&&
                    !this.isLocked){
                        updates.$set={
                            lockUnitl:Date.now()+LOCK_TIME
                        }
                    }
                this.update(updates,err=>{
                    if(!err) resolve(true)
                    else reject(err)
                })
            }
        })
    }
}
const User=mongoose.model('User',userSchema) 