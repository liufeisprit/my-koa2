var koa=require('koa')
var app=new koa()
var logger=require('koa-logger')
var convert=require('koa-convert')
function indent(n) {
    return new Array(n).join('&nbsp;')
}
var mid1=function () {
    return function *(next) {
        this.body='<h3>请求=>第一层中间件</h3>'
        yield next;
        this.body+='<h3>响应<=第一层中间件</h3>'
    }
}
var mid2=function () {
    return function *(next) {
        this.body+='<h3>'+indent(4)+'请求=>第二层中间件</h3>'
        yield next;
        this.body+='<h3>'+indent(4)+'响应<=第二层中间件</h3>'
    }
}
var mid3=function () {
    return function *(next) {
        this.body+='<h3>'+indent(8)+'请求=>第三层中间件</h3>'
        yield next;
        this.body+='<h3>'+indent(8)+'响应<=第三层中间件</h3>';
    }
}
// app.use(convert(logger()))
app.use(mid1()).use(mid2()).use(mid3())
app.use(function *() {
    this.body+='<p style="color:red">'+indent(16)+'koa核心处理业务</p>' 
})
console.log('启动');
app.listen(2333)