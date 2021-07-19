const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const hmc_schema = new Schema({
    post: String,
    name: String,
    ph : String,
    email : String,
    branch : String,
    img : String
})

module.exports = mongoose.model('hmc_member',hmc_schema);