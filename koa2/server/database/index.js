const mongoose = require('mongoose')

const glob=require('glob')
const {resolve} =require('path')
exports.initSchemas=()=>{
    glob.sync(resolve(__dirname,'./schema','!(testGlob).js')).forEach(require);
}
exports.connect = (DB_URL) => {
    return new Promise((resolve, reject) => {
        let maxConnectTimes=0
        if (process.env.NODE_ENV !== 'production') {
            mongoose.set('debug', true)
        }
        mongoose.connect(DB_URL)
        mongoose.connection.on('disconnected', (err) => {
            console.log('disconnected',err)
            if(maxConnectTimes<5){
                mongoose.connect(DB_URL)
            }else{
                throw new Error('数据库挂了')
            }
        });
        mongoose.connection.on('error', err => {
            console.log('error',err)
            maxConnectTimes++
            if(maxConnectTimes<5){
                mongoose.connect(DB_URL)
            }else{
                throw new Error('数据库挂了')
            }
        });
        mongoose.connection.once('open', data => {
            console.log('mongodb connected success')
            resolve()
        });
    })
}