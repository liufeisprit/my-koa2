const mongoose=require('mongoose')
const User=mongoose.model('User')
export const checkPassword=async (email,password)=>{
    let match=true;
    const user=await User.findOne({email})
    if(user){
        match=await user.comparePassword(password,user.password)
    }
    return {
        match,
        user
    }
}
export const registerUser=async (email,password)=>{
    let match=true,isExist=false;
    const user=await User.findOne({email})

    if(user){
        isExist=true
    }else{
        const newUser=new User({
            userName:'共产主义接班人',
            email,
            password
        })
        await newUser.save()
    }
    return {
        isExist,match
    }
}