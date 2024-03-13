import './App.scss';
import {BrowserRouter} from 'react-router-dom'
import NavHeader from './components/Navigation/NavHeader';
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useEffect, useState } from 'react';
import AppRouter from './Router.js/AppRouter';
import 'font-awesome/css/font-awesome.min.css';
import { ColorRing } from 'react-loader-spinner'
import React from 'react';
import { UserContext } from './useContext/userContext';
function App() {
  const {user}=React.useContext(UserContext);
  return (
    <div>
      <BrowserRouter>
      {user&&user.isLoading?
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
    </BrowserRouter>
    </div>
  )
}

export default App;
