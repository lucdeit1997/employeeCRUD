const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: String,
    password     : String,
    role : { type: Boolean , default: 0},   
});
const UserModel = mongoose.model('User',UserSchema );
module.exports = UserModel;