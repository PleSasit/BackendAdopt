const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let Pet = new Schema({
    name:{
        type: String
    },
    Age:{
        type: String
    },
    Description:{
        type: String
    },
    Img:{
        type: String
    }
}, {
    collection: 'Pets'
})

module.exports = mongoose.model('Pet', Pet);
