import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import { loginUser,getUserAccount } from "../service/userService";
export const fetchUser=createAsyncThunk('users/login',async(data)=>{
    if(data){
        const response=await loginUser(data);
        if(response&&response.EC===0){
            return response.DT
        }
    }
}
)
export const fetchLoginUser=createAsyncThunk('login',async()=>{
    let data=await getUserAccount();
            if(data&&data.EC===0){
                console.log('data',data.DT)
                return data.DT;
            } 
}
)
const rootReducer=createSlice({
    name:'login',
    initialState:{
        users:{},
        Loading:false,
        isLoading:false,
        isError:false,
    },
    reducers:{
        logout:(state,action)=>{
            state.users={};
            state.Loading=true;
            state.isLoading=false;
            state.isError=false;
        },
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchLoginUser.pending,(state,action)=>{
            state.Loading=false;
            state.isLoading=true;
            state.isError=false
        })
        .addCase(fetchLoginUser.fulfilled,(state,action)=>{
            state.users=action.payload;
            state.Loading=true;
            state.isLoading=false;
            state.isError=false;
        })
        .addCase(fetchUser.pending,(state,action)=>{
            state.Loading=false;
            state.isLoading=true;
            state.isError=false
        })
        .addCase(fetchUser.fulfilled,(state,action)=>{
            state.users=action.payload;
            state.Loading=true;
            state.isLoading=false;
            state.isError=false;
        })
    }
})
export const {logout}=rootReducer.actions;
export default rootReducer.reducer;
