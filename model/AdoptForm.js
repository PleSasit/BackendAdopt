const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdoptionForm = new Schema({
    name: { type: String },
    lname: { type: String },
    email: { type: String },
    phone: { type: String },
    nationality: { type: String },
    country: { type: String },
    message: { type: String }
},{
    collection: 'AdoptionForm'
})

module.exports = mongoose.model('AdoptionForm',AdoptionForm)