import {createSlice} from '@reducjs/toolkit';
const initialState = {
  socialPost: null,
  currentSelectedPost:null
}
const postSlice = createSlice({
  name : "post",
  initialState: initialState,
  reducers:{
    setSocialPost(state,action){
      state.socialPost = action.payload;
    },
    setCurrentSelectedPost(state,action){
      state.currentSelectedPost = action.payload;
    }
  }
})
export const {setSocialPost , setCurrentSelectedPost} = postSlice.actions;
export default postSlice.reducer;