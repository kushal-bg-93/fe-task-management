import { createSlice } from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:'user',
    initialState:{
        // token:null,
        // userId:null,
        // role:null
        userData:null
    },
    reducers:{
        addUser:(state,action)=>{
            state.userData=action.payload
        }
    }
})

export const {addUser}=userSlice.actions
export default userSlice.reducer