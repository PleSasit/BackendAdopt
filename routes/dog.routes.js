const express = require('express');
const app = express();

const DogRoute = express.Router();
let Dog = require('../model/dog');

//Add Dog
DogRoute.route('/add-Dog').post((req,res,next)=>{
    const latestDog = Dog.findOne({}, {}, { sort: { 'id': -1 } });
    const latestId = latestDog ? latestDog.id : '0'; // use '0' as default if no users exist yet
    const nextId = parseInt(latestId);

    Dog.create(req.body).then(result=>{
        console.log(result,nextId)
        res.json(result)
        }).catch(err=>{
        console.log(err)
        res.send({err:"error ahhh"})
    })
})

//Get All  
DogRoute.route('/Dog').get(async (req,res) =>{
    const result = await Dog.find()
console.log(result)
res.json(result)
})

//Get one
DogRoute.route('/Dog/:id').get((req,res) =>{
    Dog.find({id:req.params.id}).then(result=>{
        console.log(...result)
        res.json(...result)
        }).catch(err=>{
        console.log(err)
        res.send({err:"error ahhh"})
    })
})

// Update
DogRoute.route('/update-Dog/:id').put((req,res,next)=>{
    Dog.updateOne({id:req.params.id}, req.body).then((updatedDoc) => {
    // The updated document will be returned as a result of this method
    console.log("Update Successful");
    res.json(req.body);
  })
  .catch((err) => {
    console.error(err);
  });
})

//Delete
DogRoute.route('/delete-Dog/:id').delete((req,res,next) =>{
    Dog.deleteOne({id:req.params.id})
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

module.exports = DogRoute;