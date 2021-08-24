const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(value.length > 8 && value.length <3 && !(value.match(/^[A-Za-z]+$/g))){
                throw new Error("Name Must Be Only 8 Characters")
            }
        }
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    // tokens:[{
    //     token:{
    //         type:String,
    //         required:true
    //     }
    // }]
})

///////////////////////////////////////////////////////////////////////
userSchema.pre('save',async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password =await bcrypt.hash(user.password,8)
    }
    next();
})
////////////////////////////////////////////////////////////////////
// userSchema.methods.generateToken = async function(){
//     const user = this;
//     const token = jwt.sign({_id:user._id.toString()}, 'mean task')
//     user.tokens = user.tokens.concat({token:token})

//     await user.save()

//     return token;
// }
/////////////////////////////////////////////////////////////////
userSchema.methods.toJson = function(){
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;

    return userObject;
}
///////////////////////////////////////////////////////////////
// userSchema.statics.findByCredentials = async(email,password)=>{
//     const user = await User.findOne({email});

//     if(!user){
//         throw new Error ('Unable To Login')
//     }
//     const isMatch = await bcrypt.compare(password,user.password);

//     if(!isMatch){
//         throw new Error('Unable To Login')
//     }

//     return user
// }

/////////////////////////////////////////////////////////////////
const User = mongoose.model('User',userSchema)
module.exports = User