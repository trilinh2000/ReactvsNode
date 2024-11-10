import React, { useEffect, useState } from 'react';
import './Login.scss'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../../store/rootReducer';
const Login=(props)=>{
    const user=useSelector(state=>state.login);
    let navigate=useNavigate();
    let dispatch=useDispatch()
    const [userLogin,setUserLogin]=useState({});
    const defaultCheck={
        email:true,
        password:true
    }
    useEffect(()=>{
        if(user&&user.users&&user.users.token&&user.Loading===true){
            navigate('/user');
        }
    },[user,navigate])
    const [check,setCheck]=useState(defaultCheck);
    const handleChange=(e)=>{
        setUserLogin({...userLogin,[e.target.name]:e.target.value});
    }
    const isValid=(e)=>{
        setCheck(defaultCheck);
        if(!userLogin.email){
            setCheck({...check,email:false});
            toast.error("Please enter a value email address");
            
            return false;
        }
        let regex = /\S+@\S+\.\S+/;
        if(!regex.test(userLogin.email)){
            
            setCheck({...check,email:false});
            toast.error("Please enter a value email address");
            return false;
        }
        if(userLogin.password.length<4){
            setCheck({...check,password:false});
            toast.error("your password is value more than three");
            return false;
        }
        return true;
    }
    const handleCreateNewAccount=async()=>{
        
        navigate('/register');
    }
    const handleClick=async(e)=>{
        if(e.code==="Enter"){
            await handleLogin();
        };
    }
    const handleLogin=async(e)=>{
        let isCheck=isValid();
        if(isCheck===true){
            
            let response= await dispatch(fetchUser(userLogin));
            if(response&&response.payload&&response.payload.token){
                localStorage.setItem('jwt',response.payload.token);
                navigate("/user");
            }
            
        }
    }
    return(
        <div className="login-container ">
            <div className="container">
                <div className="row px-3 px-sm-0">
                    <div className="content-left red col-12 col-sm-7 d-none d-sm-block">
                        <div className="brand">Hoc hoi</div>
                        <div className="detail">Learning</div>
                    </div>
                    <div className="content-right green col-12 col-sm-5 d-flex flex-column gap-3 py-3 ">
                        <div className="brand d-sm-none">Hoc hoi</div>
                        <input type="text" name='email' onChange={handleChange} onKeyPress={handleClick} className={check.email?"form-control":"form-control is-invalid"} placeholder="Email address or phone number"></input>
                        <input type="password" name='password' onChange={handleChange} onKeyPress={handleClick} className="form-control" placeholder="Password"></input>
                        <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                        <span className="text-center"><a className='forgot-password' href="/">Forgot the password</a></span>
                        <hr/>
                        <div className="text-center">
                            <button className="btn btn-success" onClick={handleCreateNewAccount}>Create new account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;