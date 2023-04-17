const express = require('express');
const app = express();

const OtherRoute = express.Router();
let Other = require('../model/other');

//Add Other
OtherRoute.route('/add-Other').post((req,res,next)=>{
    const latestOther = Other.findOne({}, {}, { sort: { 'id': -1 } });
    const latestId = latestOther ? latestOther.id : '0'; // use '0' as default if no users exist yet
    const nextId = parseInt(latestId);

    Other.create(req.body).then(result=>{
        console.log(result,nextId)
        res.json(result)
        }).Otherch(err=>{
        console.log(err)
        res.send({err:"error ahhh"})
    })
})

//Get All  
OtherRoute.route('/Other').get(async (req,res) =>{
    const result = await Other.find()
console.log(result)
res.json(result)
})

//Get one
OtherRoute.route('/Other/:id').get((req,res) =>{
    Other.find({id:req.params.id}).then(result=>{
        console.log(...result)
        res.json(...result)
        }).Otherch(err=>{
        console.log(err)
        res.send({err:"error ahhh"})
    })
})

// Update
OtherRoute.route('/update-Other/:id').put((req,res,next)=>{
    Other.updateOne({id:req.params.id}, req.body).then((updatedDoc) => {
    // The updated document will be returned as a result of this method
    console.log("Update Successful");
    res.json(req.body);
  })
  .Otherch((err) => {
    console.error(err);
  });
})

//Delete
OtherRoute.route('/delete-Other/:id').delete((req,res,next) =>{
    Other.deleteOne({id:req.params.id})
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
      .Otherch((err) => {
        console.error(err);
      });
})

module.exports = OtherRoute;