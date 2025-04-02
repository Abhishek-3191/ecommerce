const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('../../models/User');




//Register
const registerUser=async(req,res)=>{
    const {userName,password,email}=req.body;
    try {
        const checkUser=await User.findOne({email});
        if(checkUser){
          return res.json({success:false,message:"User already exist with the same email address.Please try with different email"});
        }
        const hashPassword=await bcrypt.hash(password,12);
        const newUser=new User({
            userName,email,password:hashPassword
        })
        await newUser.save();
        res.status(200).json({
            message:"Registration succesfull",
            user:newUser,
            success:true
        })
    } catch (error) {
        console.log("error",error);
        res.status(500).json({
            message:"Error registering user",
            error:error,
            success:false

        })
    }
}

//Login
const loginUser=async(req,res)=>{
    const {password,email}=req.body;
    try {
        const checkUser=await User.findOne({email});
        if(!checkUser){
          return res.json({success:false,message:"User doesn't exist"});
        }
        const checkPasswordMatch=await User.findOne({password});
        if(!checkPasswordMatch){
            return res.json({success:false,message:"Password doesn't match"});
            }

        const token=jwt.sign({
            id:checkUser._id,
            email:checkUser.email,
            role:checkUser.role
        },'CLIENT_SECRET_KEY',{expiresIn:'60m'});

        res.cookie('token',token,{httpOnly:true,secure:false}).json({success:true,
            message:'Loggedin successfully',
            user:{
            id:checkUser._id,
            email:checkUser.email,
            role:checkUser.role
            }
        });
    } catch (error) {
        console.log("error",error);
        res.status(500).json({
            message:"Error registering user",
            error:error,
            success:false

        })
    }
}


module.exports={registerUser,loginUser};