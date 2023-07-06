import { createSlice } from "@reduxjs/toolkit";
const initialState={
    loggedInUserDetails:null,
    products:[]
}
export const UserSlice=createSlice({
    name:"UserDetails",
    initialState:initialState,
    reducers:{
        addUserDetails:(state,action)=>{
        state.loggedInUserDetails=action.payload;
        },
        AddProduct:(state,action)=>{
        state.products.push(action.payload)
        },
        removeUserDetails:(state,action)=>{
            state.loggedInUserDetails=null;
            state.products=[]
        }
    }
})
export const {addUserDetails,AddProduct,removeUserDetails}=UserSlice.actions
export default UserSlice.reducer;