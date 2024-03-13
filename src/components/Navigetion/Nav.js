import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './nav.scss'  
import { UserContext } from '../../useContext/userContext';
function Nav(props) {
    const {user}=React.useContext(UserContext);
    const location=useLocation();
    if((user&&user.isAuthenticated===true)||(location.pathname==='/')){
        return (
            <>
                <div className="topnav">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/user">User</NavLink>
                    <NavLink to="/contact">Contact</NavLink>
                    <NavLink to="/about">About</NavLink>
                </div>
            </>
        )
    }
    return (
        <></>
    );
}
    
export default Nav;