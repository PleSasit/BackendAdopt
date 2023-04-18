const mongoose = require('mongoose')
const Schema = mongoose.Schema;

let dog = new Schema({
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
    },
    Mystory:{
        type: String
    },
    Why:{
        type: String
    } 
    
}, {
    collection: 'Dogs'
})

module.exports = mongoose.model('dog', dog);
