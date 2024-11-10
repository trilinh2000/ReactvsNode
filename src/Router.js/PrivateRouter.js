import { Navigate } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
const PrivateRouter=({Component})=>{
    const user=useSelector(state=>state.login);
    if(user&&user.users&&user.users.token&&user.Loading===true){
        return(
            <Component/>
        )
    }
    else{
        return<Navigate to="/login" />;
    }
    
}
export default PrivateRouter;
