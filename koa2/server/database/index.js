const mongoose = require('mongoose')
const DB_URL = 'mongodb://localhost:27017/tralier'

exports.connect = () => {
    return new Promise((resolve, reject) => {
        let maxConnectTimes=0
        if (process.env.NODE_ENV !== 'production') {
            mongoose.set('debug', true)
        }
        mongoose.connect(DB_URL)
        mongoose.connection.on('disconnected', () => {
            if(maxConnectTimes<5){
                mongoose.connect(DB_URL)
            }else{
                throw new Error('数据库挂了吧 赶快解决吧 骚年')
            }
        });
        mongoose.connection.on('error', err => {
            maxConnectTimes++
            if(maxConnectTimes<5){
                mongoose.connect(DB_URL)
            }else{
                throw new Error('数据库挂了吧 赶快解决吧 骚年')
            }
        });
        mongoose.connection.once('open', data => {
            const Dogs=mongoose.model('Dogs',{name:'String'});
            const doga=new Dogs({name:'阿尔法'})
            doga.save().then(()=>{
                console.log('wang')
            }) 
            resolve()
            console.log('mongodb connected success')
        });
    })
}