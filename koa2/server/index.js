import Koa from 'koa'
import mongoose  from 'mongoose'

import html from './tpl/html'
import ejs from 'ejs'
import koaViews from 'koa-views'
import {resolve} from 'path'
import {connect,initSchemas} from './database/index'
import * as R from 'ramda'
const MIDDLEWARES=['general','router','parcel']
// const DB_URL = 'mongodb://localhost:27017/tralier'
const DB_URL = 'mongodb://104.128.89.108:27017/tralier'
console.log(require(resolve(__dirname,`./middlewares/general`)))
const useMiddlewares=(app)=>{
    R.map(
        R.compose(
            R.forEachObjIndexed(
                initWith=>initWith(app)
            ),
            require,
            name=>resolve(__dirname,`./middlewares/${name}`)
        )
    )(MIDDLEWARES)
}
async function start() {
    await connect(DB_URL)
    initSchemas()
    const app=new Koa()
    await useMiddlewares(app)
    // require('./tasks/api')
    // require('./tasks/tralier')
    // require('./tasks/qiniu')
    console.log('node start')
    app.listen(2333)
}
start()
