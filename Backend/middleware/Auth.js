import jwt from 'jsonwebtoken';
import user from '../Schema/User.js';
import dotenv from 'dotenv';

dotenv.config();
export const auth = async (req,res,next)=>{
    const authorization = req.header.authorization;
    if (!authorization){
      return res.status(401).json({
        message: "there are no token avalible from jwt ",
        error:'there is not token avaliable:'
      }); 
    }
    const token = req.headers.authorization.split(' ')[1];
    if (!token){
      return res.status(401).json({
        message:"unauthrize. plz login and try again. ",
        error,
      })
    }
    try{
      const decode = jwt.verify(token,"12345");
      req.user = decode;
      next();
    }
  catch(error){
    console.error(err);
    res.status(400).json({
      error:'invalid token ',
    })
  }
}

export const generatetoken = (userData)=>{
  return jwt.sign(userData,process.env.SECRET_KEY,{expiresIn:3000})
}
export const isAdmin = async (req,res,next)=>{
  try{
    const detail_user = req.user;
    const user_detail = await user.findOne({email:detail_user.email});
    if (user_detail.role!=="Admin"){
      return res.status(401).json({
        success:false,
        message:'this route is only for the Admin you are not autherized to do this :',
      })
    }
    next();
  }
  catch(error){
    console.error(err);
    res.status(400).json({
      message:'there has been falut in Admin role foundation: '
    })
  }
}
export const isCreator = async(req,res,next)=>{
  try{
    const detail_creator = req.user;
    const creator_detail =await user.findOne({email:detail_creator.email});
    if (creator_detail.role!=='Creator'){
      return res.status(401).json({
        success:false,
        message:'you are not the creator to do this task :',
      })
    }
    next();
  }
  catch(error){
    console.error(err);
    res.status(500).json({
      success:false,
      message:'there has been fault in Creator role foundation:',
    })
  }
}
export const isMemeber = async(req,res,next)=>{
  try{
    const student_detail = await user.findOne({email:req.user.email});
    if (student_detail.role!=="Student"){
      return res.status(401).json({
        success:false,
        message:"you are not the member plz.. register your self :",
      })
    }
    next();
  }
  catch(error){
    console.error(err),
    res.status(500).json({
      message:"there has been falut in Member role finding : ",
    })
  }
}
