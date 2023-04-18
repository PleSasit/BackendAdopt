const express = require('express');
const app = express();

const CatRoute = express.Router();
let Cat = require('../model/cat');

//Add Cat
CatRoute.route('/add-Cat').post((req,res,next)=>{
    const latestCat = Cat.findOne({}, {}, { sort: { 'id': -1 } });
    const latestId = latestCat ? latestCat.id : '0'; // use '0' as default if no users exist yet
    const nextId = parseInt(latestId);

    Cat.create(req.body).then(result=>{
        console.log(result,nextId)
        res.json(result)
        }).catch(err=>{
        console.log(err)
        res.send({err:"error ahhh"})
    })
})

//Get All  
CatRoute.route('/Cat').get(async (req,res) =>{
    const result = await Cat.find()
console.log(result)
res.json(result)
})

//Get one
CatRoute.route('/Cat/:id').get((req,res) =>{
    Cat.find({id:req.params.id}).then(result=>{
        console.log(...result)
        res.json(...result)
        }).catch(err=>{
        console.log(err)
        res.send({err:"error ahhh"})
    })
})

// Update
CatRoute.route('/update-Cat/:id').put((req,res,next)=>{
    Cat.updateOne({id:req.params.id}, req.body).then((updatedDoc) => {
    // The updated document will be returned as a result of this method
    console.log("Update Successful");
    res.json(req.body);
  })
  .catch((err) => {
    console.error(err);
  });
})

//Delete
CatRoute.route('/delete-Cat/:id').delete((req,res,next) =>{
    Cat.deleteOne({id:req.params.id})
    .then((result) => {
        if(result.deletedCount === 1){
            console.log("Delete Successful");
            res.json(req.body);
        }
        else{
            console.log('No user found with that ID');
            res.send('No user found with that ID');
        }
      })
      .catch((err) => {
        console.error(err);
      });
})

module.exports = CatRoute;