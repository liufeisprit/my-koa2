const bcrypt=require('bcrypt')
const SALT_FACTOR = 12
// $2b$12$gaZb9skP2tiSGKtJC9YE0Or72HldihB7YM/oqkz21g0E4h.pf.4Xe
// 2b 指示算法版本
// 12 是 cost 参数
// gaZb9skP2tiSGKtJC9YE0O 是 salt
// 最后的31位 r72HldihB7YM/oqkz21g0E4h.pf.4Xe 对应密码
bcrypt.genSalt(SALT_FACTOR,function(err,salt){
    console.log(salt)
    if(err){throw Error(err)}
    bcrypt.hash('mypassword', salt).then(hash=>{
        console.log(hash)
        return hash
    }).then(hashPsd=>{
        console.log(hashPsd)
        // bcrypt.compare('mypassword1',hashPsd,(err,isMatch)=>{
        //     if(err){throw Error(err)}
        //     console.log('match',isMatch)
        // })
        let isMatch=bcrypt.compareSync('mypassword','$2b$12$P0U5ZinchKb0gNJ3Sek5KuVIVG0Bym2kT/A8IBRH7bPT7e8TBZ7fK')
        console.log('match',isMatch)
    }
    )
})
