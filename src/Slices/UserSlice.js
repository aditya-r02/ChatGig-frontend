import { createSlice } from "@reduxjs/toolkit";

export const userSlice=   createSlice({
    name:"User",
    initialState:{
        token: localStorage.getItem("token")!==null?localStorage.getItem("token"):null
    },
    reducers:{
        setToken:(state, action) =>{
            state.token = action.payload;
        }
    }
})

export const {setToken} = userSlice.actions;
export default userSlice.reducer;