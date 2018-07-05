const express = require('express');
const mongoose = require('mongoose');
const router = require('express').Router();
const User = require('../models/User')
var bodyParser = require('body-parser')
const { signPromise, verifyPromise } = require('../jwt') 
const { hash, compare } = require('bcrypt');


router.get('/dang-ky',(req, res) =>{
    res.render('formSignIn_SignUp');
})

router.post('/dang-ky', async (req, res)=>{
    const {email , password} = req.body;
    const hashPassword = await hash(password, 8);
    const useData = await User.findOne({email});
    if(email.length === 0 || password.length === 0)
    {
        return res.json("vui lòng nhập Đầy đủ thông tin")
    }
    if(useData){
        return res.json("Email Tồn tại")
    }
    const UserSave = new User({
        email: email,
        password : hashPassword,
    }) 
    
    UserSave.save()
    .then((result) => {
        res.render('formSignIn_SignUp', {data: result})
        // res.json({
        //     error: false,
        //     message : "Đăng ký thành công",
        //     data: result
        // });
    })
    .catch((err) => {
        res.json(err)
    });

})

router.post('/dang-nhap', async (req, res) =>{
    const {email , password} = req.body;
    if(email.length === 0 || password.length === 0)
    {
        return res.json("vui lòng nhập Đầy đủ thông tin")
    }
   
    const checkEmail = await User.findOne({email: email});
        if(!checkEmail){
            return res.json("Email NotExist!");
        }
        else
        {
            compare(password, checkEmail.password).then(checkPass =>{
                if(!checkPass)
                {
                    return res.json("password fail!");
                }
                else
                {
                    const objRes ={};
                    objRes.userId = checkEmail._id;
                    objRes.email = checkEmail.email;
                    objRes.role = checkEmail.role;
                    const token = signPromise(objRes).then(result =>{
                        res.json(result)
                    }).catch(err =>{
                        res.json(err.message)
                    })
                }
            })
        }
       
})

module.exports = router;