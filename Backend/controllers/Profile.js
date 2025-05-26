import user from '../Schema/User.js';

export const UserDetail = async (req, res) => {
  try {
    const User_id = req.params.id;
    console.log("User ID:", User_id);

    if (!User_id) {
      return res.status(401).json({
        success: false,
        message: "This user ID doesn't exist."
      });
    }

    const user_detail = await user.findById(
      User_id,
      {
        username: true,
        email: true,
        subscribe_to: true,
        subscriber_name: true,
        name: true,
        age: true,
      }
    )/*.populate("subscribe_to")*/; // Only if needed

    if (!user_detail) {
      return res.status(404).json({
        success: false,
        message: `No user found with ID: ${User_id}`
      });
    }

    return res.status(200).json({
      success: true,
      message: "This is the user details:",
      data: user_detail
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "There is some fault in the system. Please try again later."
    });
  }
};
export const getfollower = async(req,res)=>{
  try{
    const UserId = req.body.id;
    const finderUser = req.body._id;
    if (UserId !== finderUser.tostring()){
      res.status(403).json({
        success:false,
        message:"you can't see another people follower's details : ",
      })
    }
    const follower = await user.findById({subscribe_to:UserId}).select("name username email");
    res.status(200).json({
      message:"here are your list of the follower : ",
      follower
    })
  }
  catch(error){
    console.error(err);
    res.status(400).json({
      success:false,
      message:"there has been error in fetching the data : "
    })
  }
};
export const followUser = async(req,res)=>{
  const followerId = req.user._id;
  const followeeId = req.params.id;
  if (followerId===followeeId){
    console.log("you can't follow your self: ");
    res.status(400).json({
      success:false,
      message:"you can't follow your self : ",
    })
  }
  try{
    const follower = await user.findById(followerId);
    const followee = await user.findById(followeeId);
    if (!followee){
      res.status(401).json({
        success:false,
        message:"followee doesn't exist or he deleted his account : ",
      })

    }
    const IsPresent = followee.subscriber_name.includes(follower);
    if (IsPresent){
      res.status(400).json({
        success:false,
        message:"you are already following the user : ",
      })
    }
    follower.subscribe_to.push(followeeId);
    followee.subscriber_name.push(followerId);
    await follower.save();
    await followee.save();  
    // const naame = await findById({followeeId});
    res.status(200).json({
      success:true,
      message:`now you are follower of ${followee.username} 😎 `
    })
  }
  catch(err){
    console.error(err);
    res.status(400).json({
      success:false,
      message:"there is some error in the server we can't move forward with your follower request plz.. try again after some time : "
    })
  }
}
