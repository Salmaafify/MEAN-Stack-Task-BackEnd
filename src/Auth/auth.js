const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const auth = async(req,res)=>{

    try{
        //const token = req.header('Authorization').replace('Bearer ','');
        const token = req.cookies.token;
        const decode = jwt.verify(token, 'mean task');

        const user = await User.findOne({_id:decode._id,'tokens.token':token});

        if(!user){
            throw new Error('Error Has Occurred!!')
        }
        req.user = user
       // req.token = token
    }

    catch(e){
        res.status(401).send({
            error:'Please Authenticate'
        })
    }
}

module.exports = auth;