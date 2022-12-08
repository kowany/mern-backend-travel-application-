const express = require('express')
const mongoose = require('mongoose')
const env = require('dotenv')

const pinRoute = require('./routes/pins')
const userRoute = require('./routes/users')

const app = express()
app.use(express.json())
const api = '/api'
env.config()

mongoose.connect(process.env.MONGO_CONNECTION_STRING)
    .then( () => {
        console.log('\x1b[42m%s\x1b[0m', '[SUCCESS] Mondo DB connected !')
    })
    .catch( (err) => {
        console.log('\x1b[41m%s\x1b[0m', '[FAILED] Connection to Mongo DB !')
    })

    app.use(`${api}/users`, userRoute)
    app.use(`${api}/pins`, pinRoute)
app.listen( process.env.PORT, () => {
    console.log('\x1b[42m%s\x1b[0m', `[SUCCESS] Backend server started in PORT: ${process.env.PORT}`)
})
