import React, { useState } from 'react';
import './Login.scss'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { loginUser } from '../../service/userService';
import { UserContext} from '../../useContext/userContext'
const Login=(props)=>{
    const {loginContext}=React.useContext(UserContext)
    let navigate=useNavigate();
    const [user,setUser]=useState({});
    const defaultCheck={
        email:true,
        password:true
    }
    const [check,setCheck]=useState(defaultCheck);
    const handleChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value});
    }
    const isValid=(e)=>{
        setCheck(defaultCheck);
        if(!user.email){
            setCheck({...check,email:false});
            toast.error("Please enter a value email address");
            
            return false;
        }
        let regex = /\S+@\S+\.\S+/;
        if(!regex.test(user.email)){
            
            setCheck({...check,email:false});
            toast.error("Please enter a value email address");
            return false;
        }
        if(user.password.length<4){
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
        // e.preventDefault();
        // console.log(user);
        let isCheck=isValid();
        if(isCheck===true){
            let response=await loginUser(user);
            if(+response.EC===0){
                let email=response.DT.email;
                let username=response.DT.username;
                let id=response.DT.id;
                let group=response.DT.group
                let data={
                    isAuthenticated:true,
                    token:response.DT.token,
                    account:{id,email,username,group},
                }
                localStorage.setItem('jwt',response.DT.token)
                loginContext(data);

                toast.success(response.EM);
                navigate("/user");
            }
            else{
                toast.error(response.EM);
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