class Boy {
    @speak('中文')
    run(){
        console.log('I can speak'+this.language)
        console.log('i can run')
    }
}
function speak(language) {
    return function (target,key,descriptor) { 
        console.log(key)
        console.log(target)
        target.language=language
        return descriptor
     }

}
const luke=new Boy();
luke.run()