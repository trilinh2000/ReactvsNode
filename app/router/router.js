const login = require('../Controller/login');
const userController=require('../Controller/userController');
const {checkUserJWT,checkUserPermission}=require('../middleWare/Jwtacttion');
const upload = require('../model/multer');
const storeController=require('../Controller/storeController')
// const checkUserLogin=(req,res,next)=>{
//         const nonSecurePaths = ['/', '/register', '/login'];
//         if (nonSecurePaths.includes(req.path)) return next();
      
//         //authenticate user
//         next();
// }
module.exports=app=>{
    const express =require('express');
    const router=express.Router();
    router
    .all('*',checkUserJWT,checkUserPermission)
    .get('/account',userController.getUserAccount)
    .post('/logout',login.logout)
    .post('/login',login.login)
    .post('/create',login.create)
    .post('/update/:id',login.update)
    .post('/delete/:id',login.delete)


    //user
    
    .get('/user/read',userController.readFunc)
    .post('/user/create',userController.createFunc)
    .put('/user/update',userController.updateFunc)
    .delete('/user/delete',userController.deleteFunc)

    //store
    .post('/store',checkUserJWT,upload.single('img'),storeController.create)
    app.use(router);
}