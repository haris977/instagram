import mongoose from 'mongoose';
const creatorschema = new mongoose.Schema({
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
  mobile: {
    type: String,
    required: true,
  },
  subscriber: {
    type: Number,
    default: 0,
  },
  subscriber_name: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'member',
      required: true,
    },
  ],
  subscribe_to: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'creator',
  }]
})
const Creator = mongoose.model('creator', creatorschema);
module.exports = Creator;