import mongoose from 'mongoose';
const commentschema = mongoose.Schema({
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
  },
  post:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
  }
})

const comment = mongoose.model('comment',commentschema);
export default comment;