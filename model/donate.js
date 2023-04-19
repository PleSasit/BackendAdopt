const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const donate = new Schema({
    cardH: { type: String },
    cardNum: { type: String },
    exp: { type: String },
    cvv: { type: String },
    money: { type: String }
},{
    collection: 'Donate'
})

module.exports = mongoose.model('donate',donate)