export const name='Duke'
export const getName=()=>{
    return name;
}
const age=19;
export default age;
var a={
    test:test()
}
console.log(Date.now()+'ex.js')
export async function test() { 
    console.log('test')
 }
export {
    name as name2,
    age as age2,
    getName as getName2
}