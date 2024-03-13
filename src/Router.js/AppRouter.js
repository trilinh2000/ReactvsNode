import User from '../components/users/User';
import Register from '../components/Register/register';
import Login from '../components/Login/Login';

import PrivateRouter from './PrivateRouter';
import { Route, Routes } from 'react-router-dom';
import Home from '../components/Home/Home';
const AppRouter=(props)=>{
    return(
        <div>
                <Routes>
                    <Route path='/user' element={<PrivateRouter Component={User} />}/>
                    <Route exact={true} path='/' element={<Home/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='*' element='404 not fault'/>
                </Routes>  
        </div>
    )
}
export default AppRouter;