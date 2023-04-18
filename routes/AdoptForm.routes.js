const express = require('express');
const app = express();
const AdoptionForm = require('../model/AdoptForm');
const AdoptFormRoute = express.Router();

AdoptFormRoute.route('/AdoptionForm').post((req,res,next)=>{
    AdoptionForm.create({...req.body}).then(result=>{
        console.log(req.body)
        console.log(result)
        res.json(result)
        }).catch(err=>{
        console.log(err)
        res.send({err:"error ahhh"})
    })
})

module.exports = AdoptFormRoute;