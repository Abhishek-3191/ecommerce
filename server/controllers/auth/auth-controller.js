require("dotenv").config();
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
        const checkPasswordMatch=await bcrypt.compare(password, checkUser.password);
        if(!checkPasswordMatch){
            return res.json({success:false,message:"Password doesn't match"});
            }

        const token=jwt.sign({
            id:checkUser._id,
            email:checkUser.email,
            role:checkUser.role
        },process.env.CLIENT_SECRET_KEY,{expiresIn:'60m'});

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

//Logout

const logoutUser=(req,res)=>{
    res.clearCookie('token').json({
        success:true,
        message:"Logout successfully"
    })
};

const authMiddleware=async(req,res,next)=>{
const token=req.cookies.token;
if(!token)
    return res.status(401).json({
success:false,
message:'Unauthorized user!'
})
try {
    const decoded=jwt.verify(token,process.env.CLIENT_SECRET_KEY);
    req.user=decoded;
    next();
} catch (error) {
    res.status(401).json({
        success:false,
        message:'Unauthorized user!'
    });
}
}

module.exports={registerUser,loginUser,logoutUser,authMiddleware};