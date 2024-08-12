import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import projectSlice from "./projectSlice";
import userAutoSuggestionSlice from "./userAutoSuggestionSlice";
const store=configureStore({
    reducer:{
        user:userSlice,
        project:projectSlice,
        autoSuggestionUser:userAutoSuggestionSlice
    }
})

export default store