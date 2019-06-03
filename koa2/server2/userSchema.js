const mongoose=require('mongoose')
const Schema=mongoose.Schema
const userSchema=new Schema({
    "room_id":Number,
    "uid":{
        unique:true,type:Number
    },
    "lookvideo":Number,
    "name":String,
    "pic":String,
    "plat":String,
    "type":Number,
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
userSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createdAt=this.meta.updateAt=Date.now()
    }else{
        this.meta.updateAt=Date.now()
    }
    next()
})
mongoose.model('UserList',userSchema) 