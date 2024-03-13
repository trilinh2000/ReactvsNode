import React, { useEffect, useState } from 'react'
import { getUserAccount } from '../service/userService';
const UserContext=React.createContext({
    isLoading:true,
    isAuthenticated:false,
    token:'',
    account:{}
});
const UserProvider=({children})=>{
    const [user,setUser]=useState({
        isLoading:true,
        isAuthenticated:false,
        token:'',
        account:{}
    });
    const loginContext=(userData)=>{
        setUser({...userData,isLoading:false});
    }
    const logout=()=>{
        setUser((user)=>({
            isAuthenticated:true,
            token:'fake token'
        }))
    }
    const fetchUser=async()=>{
        
        let data=await getUserAccount();
        if(data&&data.EC===0){
            setTimeout(()=>{
                setUser(data.DT)
            },2000)
            
        }
        else{
            setTimeout(()=>{
                setUser({...user,isLoading:false
                })
            },2000)
        }
    }
    useEffect(()=>{
        if(window.location.pathname!=='/'||window.location.pathname!=='/login'){
            fetchUser();
        }
        
    },[])
    return(
        <UserContext.Provider value={{user,loginContext,logout}}>
            {children}
        </UserContext.Provider>
    )
}
export {UserContext,UserProvider};