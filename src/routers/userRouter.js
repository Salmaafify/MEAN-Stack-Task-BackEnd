const userRouter = require('express').Router();
const User = require('../models/userModel');
const auth = require('../Auth/auth');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
userRouter.post('/signUp',async(req,res)=>{
    const user = new User(req.body)
    
    let newUser = await user.save();
    const token = jwt.sign(
        {
            _id:user._id,
        },
        'mean task',
        { expiresIn: "1d" }
      );

      res
      .cookie("token", token, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      })
      .status(201)
      .json({
        status: "success",
        userName: newUser.name,
        userID: newUser.id,
        // token,
      });
})

////////////////////////////////////////////////////////////////////////////////
userRouter.post('/login',async(req,res)=>{
    //const user = await User.findByCredentials(req.body.email,req.body.password);
    const user = await User.findOne({email:req.body.email})
    if(!user){
        res.status(404).json("User Not Found")
    }

    if(bcrypt.compareSync(req.body.password, user.password)){
    const token = jwt.sign(
        {
          userID: user._id,
        },
        'mean task',
        { expiresIn: "1d" }
      );
      res
      .cookie("token", token, {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly: true,
      })
      .status(200)
      .json({
        status: "success",
        userName: user.name,
        userID: user._id,
        // token,
      });
    }
    else{
        res.status(500).json('error occurred')
    }
})
////////////////////////////////////////////////////////////////////////
userRouter.get('/',async(req,res)=>{
    User.find({}).then((user)=>{
        res.status(200).json(user)
    }).catch((error)=>{
        res.status(500).json(error)
    })
})
module.exports = userRouter