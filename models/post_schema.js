const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const post_schema = new Schema({
    title : String,    
    image : {
        url: String,
        filename : String
    },
    description : String,
    expiry : String

})

module.exports = mongoose.model('post',post_schema);