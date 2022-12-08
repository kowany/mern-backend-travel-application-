const mongoose = require('mongoose')

const PinSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
        min: 3
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    lat: {
        type: Number,
        required: true
    },
    lon: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model("Pin", PinSchema)

// {
//     "userName": "Kowany",
//     "title": "Rome",
//     "rating": 5,
//     "lat": 2.13,
//     "lon": 2.144,
//     "desc": "Very nice place" 
// }

// {
//     "userName": "Kowany",
//     "title": "Catedral de León, Nicaragua",
//     "rating": 5,
//     "lat": 12.435042,
//     "lon": -86.8803117,
//     "desc": "Very nice place" 
// }