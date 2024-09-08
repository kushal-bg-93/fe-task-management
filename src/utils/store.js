import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import projectSlice from "./projectSlice";
import userAutoSuggestionSlice from "./userAutoSuggestionSlice";
import taskSlice from "./taskSlice";
const store=configureStore({
    reducer:{
        user:userSlice,
        project:projectSlice,
        autoSuggestionUser:userAutoSuggestionSlice,
        adminTask:taskSlice
    }
})

export default store