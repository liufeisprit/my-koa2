'use strict';

var fs = require('fs');
var util = require('util');
// fs.readFile('./package.json',(err,data)=>{
//     if(err) return console.log(err)
//     data=JSON.parse(data)
//     console.log(data)
// })

// function readFileAsync(path) { 
//     return new Promise((resolve,reject)=>{
//         fs.readFile(path,(err,data)=>{
//             if(err) reject(err)
//             else resolve(data)

//         })
//     })
//  }
//  readFileAsync('./package.json')
//     .then(data=>{
//         data=JSON.parse(data)
//         console.log(data.name)
//     })
//     .catch(err=>{
//         console.log(err)
//     })
util.promisify(fs.readFile)('./package.json').then(JSON.parse).then(function (data) {
    console.log(data.name);
}).catch(function (err) {
    console.log(err);
});
//# sourceMappingURL=cb-promise.js.map