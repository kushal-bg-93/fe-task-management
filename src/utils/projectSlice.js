import { createSlice } from "@reduxjs/toolkit";

const projectSlice=createSlice({
    name:'project',
    initialState:{
        // token:null,
        // userId:null,
        // role:null
        showModal:false
    },
    reducers:{
        setModal:(state,action)=>{
            state.showModal=!state.showModal
        }
    }
})

export const {setModal}=projectSlice.actions
export default projectSlice.reducer