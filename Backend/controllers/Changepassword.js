import User from './Schema/User.js'
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
export const resetpasswordtoken = async (req,res)=>{
  try{
    const {email} = req.body;
    const user = await User.findOne({email});
    if (!email){
      res.status(401).json({
        success:false,
        message:`this ${email} is not registered in our data base plz. register it first`
      })
    }
    const token = crypto.randomBytes(20).toString('hex');

  }
  catch(error){
    console.log(error);
    res.status(500).json({
      success:false,
      message:`There is some error while generating the token for ${mail}`
    })
  }
}
export const resetpassword = async(req,res)=>{
  try{
    const {newpassword,confirmpassword,token} = req.body;
    if (!newpassword || !confirmpassword){
      res.status(401).json({
        success:false,
        message:`plz.. enter all the required field for the password change requrest:`
      })
    }
    if (newpassword!==confirmpassword){
      res.status(401).json({
        success:false,
        message:'your newpassword and confirmpassword is not matching with each other : '
      })
    }
    const user = await User.findOne({token});
    if (!user){
      res.status(401).json({
        success:false,
        message:'the token is expired plz. try to generate another one and do it faster this time...'
      })
    }
    if (await bcrypt.compare(user.password,newpassword)){
      return res.status(401).json({
        success:false,
        message:"you can't enter the same password as previous one: "
      })
    }
    const hashnewpassword = await bcrypt.hash(newpassword,10);
    const updatenewpassword = await User.findOneAndUpdate(
      {token:token},
      {password:hashnewpassword},
      {new:true},
    )
    return res.status(200).json({
      success:false,
      message:'your password is updated succesfully: ',
    })
  }
  catch(error){
    console.log(error);
    res.status(500).json({
      success:false,
      message:'something is wrong with our server cannot change the password for now plz.. try agian'
    })
  }
}