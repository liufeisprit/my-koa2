import bodyParser from 'koa-bodyparser'
import logger from 'koa-logger'
export const addBodyParser=app=>{
    app.use(bodyParser())
}
export const addlogger=app=>{
    app.use(logger())
}