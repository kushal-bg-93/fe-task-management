import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import projectSlice from "./projectSlice";
const store=configureStore({
    reducer:{
        user:userSlice,
        project:projectSlice
    }
})

export default store