const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let other = new Schema({
    id:{
        type: String
    },
    name:{
        type: String
    },
    age:{
        type: String
    },
    description:{
        type: String
    },
    img:{
        type: String
    }
}, {
    collection: 'Other'
})

module.exports = mongoose.model('other', other);
