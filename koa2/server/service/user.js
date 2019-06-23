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