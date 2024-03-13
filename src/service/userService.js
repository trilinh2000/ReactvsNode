import axios from '../setup/axios'

// user
const registerNewuser=(data)=>{
    return axios.post("/create",data)
}
const loginUser=(data)=>{
    return axios.post("/login",data)
}
const fetchAllUser=(page,limit)=>{
    return axios.get(`/user/read?page=${page}&limit=${limit}`)
}
const deleteUser=(id)=>{
    return axios.delete("/user/delete",{data:{id:id}});
}
const updateUser=(data)=>{
    return axios.put("/user/update",data);
}
const getUserAccount=()=>{
    return axios.get("/account");
}
const logoutUser=()=>{
    return axios.post("/logout");
}


//store
const createStore=(data)=>{
    return axios.post('/store',data)
}
export {registerNewuser,loginUser,fetchAllUser,deleteUser,updateUser,createStore,getUserAccount,logoutUser}