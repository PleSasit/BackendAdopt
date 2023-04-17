const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let cat = new Schema({
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
    collection: 'Cats'
})

module.exports = mongoose.model('cat', cat);
