import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './nav.scss'  
import { UserContext } from '../../useContext/userContext';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown'
import logo from '../../logo.jpg';
import { logoutUser } from '../../service/userService';
import { toast } from 'react-toastify';
function NavHeader(props) {
    const {user,logoutContext}=React.useContext(UserContext);
    const location=useLocation();
    const navigate=useNavigate();
    const handleLogout=async()=>{
        let data=await logoutUser();
        if(data&&+data.EC===0){
            localStorage.removeItem('jwt');
            logoutContext();
            toast.success(data.EM);
            navigate('/login')
        }
        else{
            toast.error(data.EM);
        }
    }
    if((user&&user.isAuthenticated===true)||(location.pathname==='/')){
        return (
            <>
                <div className='nav-header'>
               <Navbar bg="header" data-bs-theme="dark">
                    <Container>
                    <Navbar.Brand><NavLink to='/' className='nav-link'><img src={logo} width={30} height={30} className='d-inline-block align-top'/>Shop Petty</NavLink></Navbar.Brand>
                    <Nav className="me-auto">
                        <NavLink to="/" className='nav-link'>Home</NavLink>
                        <NavLink to="/user" className='nav-link'>User</NavLink>
                        <NavLink to="/About" className='nav-link'>About</NavLink>
                    </Nav>
                    {user&&user.account&&user.account.username?
                        <NavDropdown title={user.account.username} id="basic-nav-dropdown">
                            <NavDropdown.Item href="/">
                                Information
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Change Pass</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item ><span onClick={handleLogout}>Logout</span></NavDropdown.Item>
                        </NavDropdown>
                        :<NavLink to="/login" className='nav-link'>Login</NavLink>
                    }
                    </Container>
                </Navbar>
               </div>
            </>
        )
    }
    return (
        <></>
    );
}
    
export default NavHeader;