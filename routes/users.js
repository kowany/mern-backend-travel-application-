const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')


// Register user

router.post('/register', async (req, res) => {
    const userCandidate = new User(req.body)

    try {
        // generate password
        const salt = await bcrypt.genSalt(10)
        const cryptedPass = await bcrypt.hash(req.body.password, salt)
        // Creating a new user
        const newUser = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: cryptedPass,
        })
        // Push the user to DB

        const userSaved = await newUser.save()
        console.log('userSaved: ', userSaved)
        res.status(200).json(userSaved._id)
        console.log('\x1b[42m%s\x1b[0m', '[SUCCESS] Registering user to DB !')
    } catch (error) {
        res.status(500).json(error)
        console.log('\x1b[41m%s\x1b[0m', '[FAILED] Adding User to DB !')
    }
})

// Login

router.post('/login', async (req, res) => {
    
    try {
        // Find a especific user
        const user = await User.findOne({userName: req.body.userName})
        
        if (!user) {
            res.status(400).json('Wrong username or password!')
            console.log('\x1b[41m%s\x1b[0m', '[FAILED] Logging to user !')
        } else {
            // validate password
            const validatePassword = await bcrypt.compare(req.body.password, user.password)
            
            if (!validatePassword) {
                res.status(400).json('Wrong username or password!')
                console.log('\x1b[41m%s\x1b[0m', '[FAILED] Logging to user !')
            } else {
                res.status(200).json(user)
                console.log('\x1b[42m%s\x1b[0m', '[SUCCESS] Logging to user !')
            }
        }
    } catch (error) {
        res.status(500).json(error)
        console.log('\x1b[41m%s\x1b[0m', '[FAILED] Logging in with user !')
    }
    })

module.exports = router