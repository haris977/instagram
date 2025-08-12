import {combineReducers} from "@reduxjs/toolkit";
import authSlice from '../slices/AuthSlice';
import messageSlice from '../slices/MessageSlice';
import postSlice from '../slices/PostSlice';
import ProfileSlice from '../slices/ProfileSlice';
const rootreducers = combineReducers({
  auth:authReducer,
  message:messageReducer,
  post :postReducer,
  profile:profileReducers,
})
export default rootreducers ;
