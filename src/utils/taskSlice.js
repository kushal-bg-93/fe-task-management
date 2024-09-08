import { createSlice } from "@reduxjs/toolkit";

const taskSlice=createSlice({
    name:'task',
    initialState:{
        // token:null,
        // userId:null,
        // role:null
        taskStatus:false
    },
    reducers:{
        changeStatus:(state,action)=>{
            state.taskStatus=action.payload
        }
    }
})

export const {changeStatus}=taskSlice.actions
export default taskSlice.reducer