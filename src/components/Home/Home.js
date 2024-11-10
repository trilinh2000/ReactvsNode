import { useEffect, useState } from 'react';
import {createStore, getStore} from '../../service/userService'
import { toast } from 'react-toastify';
import { ColorRing } from 'react-loader-spinner'
import './home.scss'
import { useSelector } from 'react-redux';
import { getPoint } from '../../service/userService';
// ES6 module
import Plot from 'react-plotly.js';


const Home=()=>{
    const [point,setPoint]=useState([])
    const [listStore,setListStore]=useState([])
    const [isLoading,setIsLoading]=useState((false))
    const [selectedImg,setSelectedImg]=useState(null);
    const [title,setTitle]=useState("");
    const [isShow,setIsShow]=useState(false)
    const users=useSelector(state=>state.login.user);
    
    useEffect(()=>{
        fetchStore();
    },[listStore,point,isLoading])
    
    const fetchStore=async()=>{
        let data=await getStore();
        let point1=await getPoint()
        setPoint(point1.DT);
        if(data&&data.EC===0){
            setListStore(data.DT);
            setIsLoading(true)
        }
    }
    const handleClick=async(e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append("title",title)
        formData.append("img",selectedImg)
        let data=await createStore(formData);
        if(+data.EC===0){
            toast.success(data.EM);
            setSelectedImg(null);
            setTitle("")
        }
        else{
            toast.error(data.EM);
        }
    }
    const handleShow=()=>{
        setIsShow(true);
    }
    return(

            <div className='home-container'>
                {listStore&&isLoading===false?
                <> 
                    <div className='loading-container'>
                        <ColorRing
                        visible={true}
                        height="100"
                        width="100"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={['#e15b64']}
                        />
                        <div>Loading...</div>
                    </div>
                </>:
                <div className='container'>
                    <div className='row px-3 d-flex flex-column'>
                        <div id="gd">
                            
                        <Plot
                            data={[
                            {
                                x:point[0].x,
                                y: point[0].y,
                                type: 'scatter',
                                mode: 'lines+markers',
                                marker: {color: 'red'},
                            },
                            // {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
                            ]}
                            layout={    
                                {
                                    width:700,
                                    height:700,
                                    x: {range: [0, 500], title: "Square Meters"},
                                    y: {range: [0, 500], title: "Price in Millions"},
                                    title: "House Prices vs. Size"
                                } 
                            }
                        />
                        </div>
                    </div>
                </div>
                }
            </div>
    )

}
export default Home;