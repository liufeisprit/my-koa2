function makeIterator(arr) { 
    let nextIndex=0;
    return {
        next:()=>{
            if(nextIndex<arr.length){
                return{
                    value:arr[nextIndex++],
                    done:false
                }
            }else{
                return{
                    done:true
                }
            }
        }
    }
 }
 var arr=['吃饭','睡觉','打豆豆']
//  const it=makeIterator(arr)
//  console.log(it.next().value)
//  console.log(it.next().value)
//  console.log(it.next().value)
//  console.log(it.next().done)
function *makeGenIterator(arr) {
    for(var i=0;i<arr.length;i++){
        yield arr[i]
    }
}
const gen=makeGenIterator(arr)
console.log(gen.next().value)
console.log(gen.next().value)
console.log(gen.next().value)
console.log(gen.next().done)