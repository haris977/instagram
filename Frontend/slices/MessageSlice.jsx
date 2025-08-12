import {createSlice} from "@ruduxjs/tooklit";
const initialState = {
  roomId:null,
  reciver:null,
  chatData:null,
}
const messageSlice = createSlice( {
  name : "message",
  initialState :initialState,
  reducers:{
    setRoomId(state,action){
      state.roomId = action.payload
    },
    setReciver(state,action){
      state.reciver = action.payload
    },
    setChatData(state,action){
      state.setChatData = action.payload;
    },
  }
})
export const {setRoomId, setReciver, setChatData} = messageSlice.action;
export default messageSlice.reducer;