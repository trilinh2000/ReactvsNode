import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import './User.scss';
import { registerNewuser, updateUser } from '../../service/userService';
import { toast } from 'react-toastify';
const ModelUser=(props)=>{
    const groupID=["Dev","Leader","Project Manager"];
    const [user,setUser]=useState({});
    const isDefault={
        username:true,
        email:true,
        phone:true,
        password:true,
        group:true
    }
    const [isValid,setIsValid]=useState(isDefault);
    const checkIsValidInput=()=>{
        setIsValid(isDefault);
        if(!user.email){
            setIsValid({...isValid,email:false});
            toast.error("email null");
            return false
        }
        if(!user.username){
            setIsValid({...isValid,username:false});
            toast.error("username null");
            return false
        }
        if(!user.phone){
            setIsValid({...isValid,phone:false});
            toast.error("phone null");
            return false
        }
        if(props.title!=="Update"){
            if(!user.password){
                setIsValid({...isValid,password:false});
                toast.error("password null");
                return false
            }
        }
        if(!user.group){
            setIsValid({...isValid,group:false});
            toast.error("group null");
            return false
        }
        return true;
    }
    useEffect(()=>{
        if(props.title==="Update"){
            if(props.dataModel.group===''){
                setUser({...props.dataModel,group:"Dev"})
            }
            else{
                setUser({...props.dataModel})
            }
        }
        else{
            setUser({...props.dataModel,group:"Dev"})
            
        }
        ;//khi dataModel thay doi thi refesh lai
    },[props])
    const handleChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value})
    }
    const handlePageClick=async()=>{
        let data=checkIsValidInput();
            if(data===true){
                if(props.title==="Update"){
                    let data=await updateUser(user);
                    if(data&&data.EC===0){
                        toast.success(data.EM);
                        props.handleClose();
                        setIsValid(isDefault);
                        props.onReset();
                    }
                    else{
                        toast.error(data.EM);
                    }
                }
                else{
                    let data= await registerNewuser(user);
                    console.log("register>>>",data)
                    if(data&&data.EC===0){
                        toast.success(data.EM);
                        props.handleClose();
                        setUser({});
                        props.onReset();
                    }
                    else{
                        toast.error(data.EM);
                    }
                }
            }
    }
    return(
        <>
            <Modal size='lg' show={props.show} onHide={props.handleClose} centered className='model-user'>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <span>{props.title==="Update"?`Update a user ${user.username} `:"Create"}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="container-body row">
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Email address(<span className='red'>*</span>):</label>
                            <input name='email' type="email" className={isValid.email?'form-control':'form-control is-invalid'} value={(user&&user.email)||""} onChange={handleChange}/>
                        </div>
                        <div className='col-12 col-sm-6 form-group'>
                            <label>UserName(<span className='red'>*</span>):</label>
                            <input name='username' type='username' className={isValid.username?'form-control':'form-control is-invalid'} value={(user&&user.username)||""} onChange={handleChange}/>
                        </div>

                        <div className='col-12 col-sm-6 form-group'>
                            <label>Phone address(<span className='red'>*</span>):</label>
                            <input name='phone' type='phone' className={isValid.phone?'form-control':'form-control is-invalid'} value={(user&&user.phone)||""} onChange={handleChange}/>
                        </div>
                        {props&&props.title!=="Update"&&(
                            <div className='col-12 col-sm-6 form-group'>
                            <label>Password(<span className='red'>*</span>):</label>
                            <input name='password' type='password' className={isValid.password?'form-control':'form-control is-invalid'} value={(user&&user.password)||""} onChange={handleChange}/>
                            </div>
                        )}
                        <div className='col-12 col-sm-6 form-group'>
                            <label>Group(<span className='red'>*</span>):</label>
                            <select className={isValid.group?'form-select':'form-select is-invalid'} value={user.group} name='group' onChange={handleChange}>
                                {groupID.map((items,key)=>{
                                        return (
                                            <option key={`row-${key}`} value={items} >{items}</option>
                                        )
                                }
                                )}
                            </select>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handlePageClick}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default ModelUser;