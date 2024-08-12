import { createSlice } from "@reduxjs/toolkit";

const autoSuggestionSlice=createSlice(
    {
        name:'autoSuggestionSlice',
        initialState:{
            'result':{
                "dummyKey":[
                {
                    _id:"dummy_id",
                    name:"dummy_name",
                    role:"dummy_role",
                    email:"dummy_email"
                }
            ]}
        },
        reducers:{
            setAutoSuggestions:(state,action)=>{
                state.result={...state.result,...action.payload}
            }
        }
    }
)

export const {setAutoSuggestions}=autoSuggestionSlice.actions;
export default autoSuggestionSlice.reducer;