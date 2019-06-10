const mongoose=require('mongoose')
const Schema=mongoose.Schema
const RobotsSchema=new Schema({
    "room_id":Number,
    "uid":{
        unique:true,type:Number
    },
    'is_active': Number,
    "name":String,
    "pic":String,
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
RobotsSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createdAt=this.meta.updateAt=Date.now()
    }else{
        this.meta.updateAt=Date.now()
    }
    next()
})
mongoose.model('RobotsList',RobotsSchema) 