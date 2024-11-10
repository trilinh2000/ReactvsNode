import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { fetchAllUser } from "../service/userService";
export const fetchListUser=createAsyncThunk("listUser",async(currentPage,currentLimit)=>{
    const user=useSelector(state=>state.login.users);
    if(user&&(user.group==="Leader"||user.group==="Project Manager")){
        const response=await fetchAllUser(currentPage,currentLimit);
        if(response&&response.EC===0){
            return response.DT;
        }
    } 
})
const listUserReducer=createSlice({
    name:'user',
    initialState:{
        listUser:[],
        totalPage
    },
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchListUser.pending,(state,action)=>{

        })
        .addCase(fetchListUser.fulfilled)
    }
})
export default listUserReducer.reducer;