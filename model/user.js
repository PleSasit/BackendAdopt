const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSignup = new Schema({
    email: { type: String },
    username: { type: String, unique:true },
    password: { type: String },
},{
    collection: 'User',versionKey:false
})

const User = mongoose.model('userSignup', userSignup)
module.exports = User