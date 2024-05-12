const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
    },

    firstname_and_lastname: {
        type: String,
        require: true,
    },

    password:{
        type: String,
        require: true,
        min:6,
    }
}, {timestamps: true})

module.exports = mongoose.model("User", UserSchema)