const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeSchema = new Schema({
    fullName: String,
    age     : Number,
    address : String,   
});
const employeModel = mongoose.model('Employee',EmployeSchema );
module.exports = employeModel;