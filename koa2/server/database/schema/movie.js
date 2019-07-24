const mongoose=require('mongoose')
const Schema=mongoose.Schema
const {Mixed,ObjectId}=Schema.Types
const movieSchema=new Schema({
    doubanId:{type:String,unique:true},
    rate:Number,
    title:String,
    summary:String,
    cover:String,
    video:String,
    videoKey:String,
    poster:String,
    rawTitle:String,
    coverKey: String,
    posterKey: String,
    year:[Number],
    movieTypes:[String],
    pubdate:Mixed,
    director:[String],
    tags:Array,
    category:[{
        type:ObjectId,
        ref:'Category'
      }],
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
movieSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createdAt=this.meta.updateAt=Date.now()
    }else{
        this.meta.updateAt=Date.now()
    }
    next()
})
mongoose.model('Movie',movieSchema) 