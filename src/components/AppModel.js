import AppRouter from '../Router.js/AppRouter';
import { ColorRing } from 'react-loader-spinner';
import NavHeader from './Navigation/NavHeader'
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
export default function AppModel(){
    const user=useSelector(state=>state.login);
    return(
        <>
            {user&&user.users&&user.Loading===false?
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
                </div>:
                <>
                    <div className='app-header'>
                    <NavHeader/>
                    </div>
                    <div className='app-container'>
                    <AppRouter/>
                    </div>
                </>}
                <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                />
        </>
    )
}