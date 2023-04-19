const express = require('express');
const app = express();
const donate = require('../model/donate');
const DonateRoute = express.Router();

DonateRoute.route('/donate').post((req,res,next)=>{
    donate.create({...req.body}).then(result=>{
        console.log(req.body)
        console.log(result)
        res.json(result)
        }).catch(err=>{
        console.log(err)
        res.send({err:"error ahhh"})
    })
})

module.exports = DonateRoute;