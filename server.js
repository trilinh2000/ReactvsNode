const express=require('express');
// const http = require('http')
const app=express();
const cookieParser=require('cookie-parser');
const mongodb=require('../webapp-backend/app/config/configmongodb')
const configLink=require('./app/config/configreact')
require('dotenv/config')
mongodb();
configLink(app);
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
require('./app/router/router')(app);
app.listen(3001,(err)=>{
    if(err) throw err;
    console.log('Connect server');
})
