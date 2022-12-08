const router = require('express').Router()

const Pin = require('../models/Pin')

// Creating a Pin
router.post('/', async (req, res) => {
    const pinCandidate = new Pin(req.body)
    console.log(pinCandidate)
    try {
        const savePin = await pinCandidate.save()
        res.status(200).json(savePin)
        console.log('\x1b[42m%s\x1b[0m', '[SUCCESS] Pin added to DB !')
    } catch (error) {
        console.log('\x1b[41m%s\x1b[0m', '[FAILED] Adding Pin to DB !')
        res.status(500).json(error)
    }
})

// Get all pins

router.get('/', async (req, res) => {
    
    try {
        const pins = await Pin.find()
        console.log('\x1b[42m%s\x1b[0m', '[SUCCESS] Finding all pins !')
        res.status(200).json(pins)
        
    } catch (error) {
        console.log('\x1b[41m%s\x1b[0m', '[FAILED] Getting all pins !')
        res.status(500).json(error)
    }
})

module.exports = router