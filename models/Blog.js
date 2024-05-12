const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        unique: true,
    },

    description: {
        type: String,
    },

    author:{
        type: String,
    },

    state:{
        type: String,
        require: true,
    },
    read_count:{
        type: String,
    },
    reading_times:{
        type: String,
    },
    tags:{
        type: String,
    },
    body:{
        type: String,
        require: true,
    }
}, {timestamps: true})

module.exports = mongoose.model("Blog", BlogSchema)