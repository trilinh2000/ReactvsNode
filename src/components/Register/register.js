import { useState } from 'react';
import './register.scss'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { registerNewuser } from '../../service/userService';
const Register=(props)=>{
    const [user,setUser]=useState({});
    const defaultCheck={
        email:true,
        phone:true,
        username:true,
        password:true,
        confirmPassword:true
    }
    const [objCheck,setObjCheck]=useState(defaultCheck)
    const handleChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }
    let navigate=useNavigate();
    const isValid=(e)=>{
        setObjCheck(defaultCheck);
        if(!user.email){
            toast.error("Email is required");
            setObjCheck({...objCheck,email:false})
            return false;
        }
        let regex = /\S+@\S+\.\S+/;
        if(!regex.test(user.email)){
            setObjCheck({...objCheck,email:false})
            toast.error("Please enter a value Email address");
            return false;
        }
        if(!user.phone){
            setObjCheck({...objCheck,phone:false})
            toast.error("Phone is required");
            return false;
        }
        if(!user.username){
            setObjCheck({...objCheck,username:false})
            toast.error("User name is required");
            return false;
        }
        if(!user.password){
            setObjCheck({...objCheck,password:false})
            toast.error("Password is required");
            return false;
        }
        if(user.password!==user.confirmPassword){
            setObjCheck({...objCheck,confirmPassword:false})
            toast.error("Your Password is the same");
            return false;
        }
        
        return true
    }
    const handleLogin=()=>{
        navigate('/login');
    }
    const handleRegister=async(e)=>{
        e.preventDefault();
        let check=isValid();
        if(check===true){
            let response=await registerNewuser(user)
            if(+response.EC===0){
                toast.success(response.EM);
                navigate('/login');
            }
            else{
                toast.error(response.EM)
            }
        }
        
        
    }
    return(
        <div className="register-container ">
            <div className="container">
                <div className="row px-3 px-sm-0">
                    <div className="content-left red col-12 col-sm-7 d-none d-sm-block">
                        <div className="brand">Hoc hoi</div>
                        <di className="detail">Learning</di>
                    </div>
                    <div className="content-right green col-12 col-sm-5 d-flex flex-column gap-3 py-3 ">
                        <div className="brand d-sm-none">Hoc hoi</div>
                        <div className='form-group'>
                            <label>Email:</label>
                            <input type="text" name='email' className={objCheck.email?"form-control":"form-control is-invalid"} onChange={handleChange} placeholder="Email address"></input>
                        </div>
                        <div className='form-group'>
                            <label>Phone number:</label>
                            <input type="text" name='phone' className={objCheck.phone?"form-control":"form-control is-invalid"} onChange={handleChange} placeholder="Phone number"></input>
                        </div>
                        <div className='form-group'>
                            <label>User name:</label>
                            <input type="text" name='username' className={objCheck.username?"form-control":"form-control is-invalid"} onChange={handleChange} placeholder="User name"></input>
                        </div>
                        <div className='form-group'>
                            <label>Password:</label>
                            <input type="password" name='password' className={objCheck.password?"form-control":"form-control is-invalid"} onChange={handleChange} placeholder="Password"></input>
                        </div>
                        <div className='form-group'>
                            <label>Re-enter password:</label>
                            <input type="password" name='confirmPassword' className={objCheck.confirmPassword?"form-control":"form-control is-invalid"} onChange={handleChange} placeholder="Re-enter password"></input>
                        </div>
                        
                        <button className="btn btn-primary" onClick={handleRegister}>Register</button>
                        <hr/>
                        <div className="text-center">
                            <button className="btn btn-success" onClick={handleLogin}>Already have an  account. Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register;