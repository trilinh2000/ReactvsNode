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
    const logoutContext=async()=>{
        setUser({isLoading:false,
            isAuthenticated:false,
            token:'',
            account:{}})
    }
    const fetchUser=async()=>{
        
        let data=await getUserAccount();
        if(data&&data.EC===0){
            setTimeout(()=>{
                setUser(data.DT)
            },10000)
            
        }
        else{
            setTimeout(()=>{
                setUser({...user,isLoading:false
                })
            },2000)
        }
    }
    useEffect(()=>{
        if(window.location.pathname!=='/'&&window.location.pathname!=='/login'){
            fetchUser();
        }
        else{
            setUser({...user,isLoading:false})
        }
        
    },[])
    return(
        <UserContext.Provider value={{user,loginContext,logoutContext}}>
            {children}
        </UserContext.Provider>
    )
}
export {UserContext,UserProvider};