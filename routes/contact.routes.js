const express = require('express');
const app = express();
const Contact = require('../model/contact');
const ContactRoute = express.Router();

ContactRoute.route('/contact').post((req,res,next)=>{

    // const Contacts = {
    //     name:req.body.name,
    //     email:req.body.email,
    //     phone:req.body.phone,
    //     usermessage:req.body.a
    // }
    Contact.create({...req.body}).then(result=>{
        console.log(req.body)
        console.log(result)
        res.json(result)
        }).catch(err=>{
        console.log(err)
        res.send({err:"error ahhh"})
    })
})

module.exports = ContactRoute;