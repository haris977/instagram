import mongoose from 'mongoose';
import user from './User.js'
const postscehma = mongoose.Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
  },
  commentallowed:{
    type:Boolean,
  },
  likes:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
  }],
  privacystatus:{
    type:String,
    enum : ["private","public"],
    defalut:"private",
  },
  comments:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  photos:[{
    type:String,
    required: true,
  }],
  music:{
    type:String,
  }
})
const post = mongoose.model('post',postscehma);
export default post ;