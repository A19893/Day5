import { createSlice } from "@reduxjs/toolkit";
const initialState={
    isAuth:false,
    currentUserId:null,
}
export const AuthSlice=createSlice({
    name:"Authentication",
    initialState:initialState,
    reducers:{
        addAuthentication:(state,action)=>{
            console.log(action)
            state.isAuth=true;
            state.currentUserId=action.payload
        },
        removeAuthentication:(state,action)=>{
            state.isAuth=false;
            state.currentUserId=null;
        }
    }
})
export const {addAuthentication,removeAuthentication}=AuthSlice.actions
export default AuthSlice.reducer;