import mongoose from 'mongoose';
const memberschema = new mongoose.Schema({
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
    unique:true,
  },
  username: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  subscribe_to: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'creator',
  }]
});
const member = mongoose.model('members', memberschema);
export default member;