import './App.scss';

import "bootstrap/dist/css/bootstrap.min.css";

import 'react-toastify/dist/ReactToastify.css';
// import { useEffect, useState } from 'react';
import {BrowserRouter} from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import AppModel from './components/AppModel';
import React, { useEffect } from 'react';
import { useDispatch} from 'react-redux';
import { fetchLoginUser } from './store/rootReducer';


function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
        dispatch(fetchLoginUser()); 
},[dispatch])
  return (
      <BrowserRouter>
        <AppModel/>
      </BrowserRouter>
  )
}

export default App;
