@test(1111)
class Boy {
    @speak('中文')
    run(){
        console.log('I can speak'+this.language+this.text)
        console.log('i can run')
    }
}
//装饰类的熟悉 target 被装饰的属性所属类的原型 key 被装饰的属性 descriptor 装饰的对象的描述对象 writable enumerable configurable等
function speak(language) {
    return function (target,key,descriptor) { 
        console.log(key)
        console.log(target)
        console.log(descriptor)
        target.language=language
        return descriptor
     }

}
//装饰类本身 target就是类本身
function test(text){
    return function (target) { 
        console.log(target)
        target.prototype.text=text
     }
}
const luke=new Boy();
luke.run()