const express = require('express');
const app = express();

const PetRoute = express.Router();
let Pet = require('../model/pets');

// Add Pet
PetRoute.route('/add-pets').post((req, res, next) => {
    Pet.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data)
        }
    })
})

// Get all Pet
PetRoute.route('/').get((req, res) => {
    Pet.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Get Pet
PetRoute.route('/read-pet/:id').get((req, res) => {
    Pet.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

// Update Pet
PetRoute.route('/update-pet/:id').put((req, res, next) => {
    Pet.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
            console.log(error);
        } else {
            res.json(data);
            console.log('Pet Updated Successfully');
        }
    })
})

// Delete Pet
PetRoute.route('/delete-pet/:id').delete((req, res, next) => {
    Pet.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            });
        }
    })
})

module.exports = PetRoute;