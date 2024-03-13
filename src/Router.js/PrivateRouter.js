import { useNavigate,redirect, Navigate } from "react-router-dom";
import React, { useEffect } from "react";
import { UserContext } from "../useContext/userContext";
const PrivateRouter=({Component})=>{
    const {user}=React.useContext(UserContext);
    if(user&&user.isAuthenticated===true){
        return(
            
            <Component/>
        )
    }
    else{
        return<Navigate to="/login" />;
    }
    
}
export default PrivateRouter;
