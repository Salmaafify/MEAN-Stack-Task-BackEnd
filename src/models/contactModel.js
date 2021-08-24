const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(value.length > 8 && value.length <3 && !(value.match(/^[A-Za-z]+$/g))){
                throw new Error("Name Must Be Only 8 Characters")
            }
        }
    },
    phone:{
        type: Number,
        required: true,
        trim: true,
    },
    address:{
        type: String,
        default: null,
        trim:true
    },
    notes:{
        type: String,
        default: null,
        trim:true
    },
});

const Contact =  mongoose.model('Contact',contactSchema);
module.exports = Contact

