import { useState } from 'react';
import {createStore} from '../../service/userService'
const Home=()=>{
    const [selectedImg,setSelectedImg]=useState(null);
    const [title,setTitle]=useState("")
    console.log(title);
    const handleClick=async(e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append("title",title)
        formData.append("img",selectedImg)
        console.log(formData);
        let data=await createStore(formData);
        if(+data.EC===0){
            setSelectedImg(null);
            setTitle("")
        }
    }
    return(
        <>
            <h3>Upload and display</h3>
            {
                selectedImg&&(
                    <>
                        <img alt='not found' width={"250px"} src={URL.createObjectURL(selectedImg)}></img>
                        <br />
                        <button onClick={() => setSelectedImg(null)}>Remove</button>
                    </>
                )
            }
                   <form>
                        <input type="text" className="form-control-file" value={title||""} name="title" onChange={(e)=>{setTitle(e.target.value)}}/>
                        <input type="file" className="form-control-file" name="img" onChange={(e)=>{setTitle(e.target.files[0])}}/>
                        <button onClick={handleClick}>Post</button>
                   </form>
        </>
    )

}
export default Home;