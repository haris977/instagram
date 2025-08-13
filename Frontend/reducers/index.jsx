import {combineReducers} from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import profileReducer from "../slices/profileSlice"
import postReducer from "../slices/postSlice"
import messageReducer from "../slices/messageSlice"
const rootreducers = combineReducers({
  auth:authReducer,
  message:messageReducer,
  post :postReducer,
  profile:profileReducer,
})
export default rootreducers ;
