import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import './nav.scss'  
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import logo from '../../logo.jpg';
import { logoutUser } from '../../service/userService';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/rootReducer';
function NavHeader(props) {
    const user=useSelector(state=>state.login)
    const location=useLocation();
    const navigate=useNavigate();
    const dispatch=useDispatch()
    const handleLogout=async()=>{
        let data=await logoutUser();
        if(data&&+data.EC===0){
            localStorage.removeItem('jwt');
            dispatch(logout());
            toast.success(data.EM);
            navigate('/login');
        }
        else{
            toast.error(data.EM);
        }
    }
    if((user&&user.users&&user.users.token&&user.Loading===true)||(location.pathname==='/')){
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
                        <Form className="d-flex">
                            <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            />
                            <Button variant="outline-success">Search</Button>
                        </Form>
                    </Nav>
                    
                    {user&&user.users&&user.users.username?
                        <NavDropdown title={user.users.username} id="basic-nav-dropdown">
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