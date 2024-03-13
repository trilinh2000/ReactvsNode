import React,{ useEffect, useState } from "react";
import './User.scss'
import { deleteUser, fetchAllUser } from "../../service/userService";
import ReactPaginate from 'react-paginate';
import "bootstrap/dist/css/bootstrap.min.css";
import { toast } from "react-toastify";
import ModelDelete from "./ModelDelete";
import ModelUser from "./ModelUser";
import { UserContext } from "../../useContext/userContext";
import { useNavigate } from 'react-router-dom';
const User=(props)=>{
    
    const [listUser,setListUser]=useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage,setCurrentPage]=useState(1);
    const [currentLimit]=useState(2);
    const [isShowDelete,setIsShowDelete]=useState(false);
    const [dataModel,setDataModel]=useState({});
    const [isShowEdit,setIsShowEdit]=useState(false);
    const [dataEdit,setDataEdit]=useState({});
    const [title,setTitle]=useState("Update");
    const navigate=useNavigate();
    const {user}=React.useContext(UserContext);
    useEffect(()=>{
        if(user.account&&(user.account.group==="Leader"||user.account.group==="Project Manager")){
            fetchUser();
        }
        
    },[currentPage]);
   
    const fetchUser=async()=>{
        const response=await fetchAllUser(currentPage,currentLimit);
        if(response&&response.EC===0){
            setPageCount(response.DT.totalPage);
            setListUser(response.DT.users)
        }
        else{
            toast.error(response.EM);
            setListUser([]);
            navigate('/');
        }
    }
    const handleDeleteUser=async(user)=>{
        setDataModel(user)
        setIsShowDelete(true);
    }
        
    const confirmDeleteUser=async()=>{
        const response=await deleteUser(dataModel._id);
        if(response){
            toast.success(response.EM);
            await fetchUser();
            setIsShowDelete(false);
        }
        else{
            toast.error(response.EM);
        }
    }
    const handleClose=()=>{
        setIsShowDelete(false);
        setIsShowEdit(false);
        setDataEdit({})
        setDataModel({});
    }
    const handlePageClick = async(event) => {
        setCurrentPage(+event.selected+1);
      };
    const handleEditUser=async(user)=>{
        setTitle("Update");
            setDataEdit(user);
            setIsShowEdit(true);
            // console.log(title);
    }
    const handleCreateUser=async()=>{
        setTitle("create");
        setDataEdit({});
        setIsShowEdit(true);
    }
    return(
        <>
        <div className="manager-users-container">
            <div className="user-header">
                <div className="title">
                    <h3>Table User</h3>
                </div>
                <div className="actions">
                    <button className="btn btn-success" onClick={()=>{fetchUser();}}>Refresh</button>
                    <button className="btn btn-primary" onClick={()=>{handleCreateUser()
                    
                }}>Add User</button>
                </div>

            </div>
            <div className="user-body">
                <table className="table table-bordered table-hover table-dark">
                    <thead>
                        <tr>
                        <th scope="col">ID</th>
                        <th scope="col">UserName</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Group</th>
                        <th scope="col">action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUser&&listUser.length>0?<>{listUser.map((items,index)=>{
                            return(
                                <tr key={`row-${index}`}>
                                    <td>{items._id}</td>
                                    <td>{items.username}</td>
                                    <td>{items.email}</td>
                                    <td>{items.phone}</td>
                                    <td>{items.group}</td>
                                    <td>
                                        <span className="span" onClick={()=>handleEditUser(items)}><i className="fa fa-pencil"></i></span>
                                        <span className="span" onClick={()=>{handleDeleteUser(items)}}><i className="fa fa-trash"></i></span>
                                    </td>
                                </tr>
                            )
                        })}</>:<>
                                <tr>
                                    <td>not found</td>
                                    <td>not found</td>
                                    <td>not found</td>
                                    <td>not found</td>
                                </tr>
                        </>}
                    </tbody>
                </table>
            </div>
            {pageCount>0&&
            <div className="user-footer">
                <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                />
            </div>
            }
        </div>
        <ModelDelete show={isShowDelete} handleClose={handleClose} dataModel={dataModel} confirmDeleteUser={confirmDeleteUser}/>
        <ModelUser title={title} show={isShowEdit} handleClose={handleClose} dataModel={dataEdit}  onReset={fetchUser}/>
        </>
        
    )
}
export default User;