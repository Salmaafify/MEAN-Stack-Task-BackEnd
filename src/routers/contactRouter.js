const contactRouter = require('express').Router();
const Contact = require('../models/contactModel');
const auth = require('../Auth/auth')
const APIFeatures = require('../utils/apiFeatures')

contactRouter.post('/contacts',async(req,res)=>{
    const contact = new Contact(req.body);
    try{
        await contact.save();
        res.status(201).json(contact)
    }
    catch(error){
        res.status(400).json(error)
    }
})
//////////////////////////////////////////////////////////////////
contactRouter.get('/contacts',async(req,res)=>{
    // Contact.find({}).then((contact)=>{
    //     res.status(200).json(contact)
    // }).catch((error)=>{
    //     res.status(500).json(error)
    // })

    const features = new APIFeatures(Contact.find(),req.query).paginate()

    const contacts = await features.query;

    res.status(200).json(contacts);
})
//////////////////////////////////////////////////
contactRouter.patch('/contacts/:id',async(req,res)=>{
    const updates = Object.keys(req.body);
    const _id = req.params.id;
    try{
        const contact = await Contact.findById(_id);
        if(!contact){
            res.status(404).json("This Contact Is Not Found")
        }
        updates.forEach((update)=>{
            contact[update] = req.body[update]
        })

        await contact.save();
        res.status(200).json(contact)
    }
    catch(error){
        res.status(400).json(error)
    }
})
/////////////////////////////////////////////////////
contactRouter.delete('/contacts/:id',async(req,res)=>{
    const _id = req.params.id;
    try{
        const contact = await Contact.findByIdAndDelete(_id);
        if(!contact){
            res.status(404).json("This Contact Is Not Found")
        }
        res.status(200).json("Deleted Successfully")
    }
    catch(error){
        res.status(400).json(error)
    }
})

module.exports = contactRouter