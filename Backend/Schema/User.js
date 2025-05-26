import mongoose from 'mongoose';
const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  password:{
    type:String,
    required:true,
  },
  mobile: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'creator', 'member'],
    default: 'member',
  },
  
  subscribe_to: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    }
  ],
  subscriber_name: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
  ],
})

const user = mongoose.model('user', userschema);
export default user;