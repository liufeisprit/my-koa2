class Boy {
    @speak('中文')
    run(){
        console.log('I can speak'+this.language)
        console.log('i can run')
    }
}
function speak(language) {
    return function (target,key,descriptor) { 
        target.language=language
        return descriptor
     }

}
const luke=new Boy();
luke.run()