const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const User = mongoose.model('user')
// console.log(User)
const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../keys')
const requireLogin = require('../middleware/requireLogin')

router.get('/', (req, res) => {
    res.send('sdfsdfdsfdfljklk');

})

router.get('/pro', requireLogin, (req, res) => {
    res.send('Hello from pro');
})

router.post('/signup', (req, res) => {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
        res.status(422).json({ error: "please enter all fields" })
    }
    // res.json({message:"success"})
    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({ error: "user already exist" })
            }
            bcrypt.hash(password, 12)
                .then(hashedpassword => {
                    const user = new User({
                        email,
                        name,
                        password: hashedpassword
                    })
                    user.save()
                        .then(user => {
                            res.json({ message: "saved successful" })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })

        })
        .catch(err => {
            console.log(err)
        })


})

router.post('/signin', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(422).json({ error: "add email and password" })
    }
    User.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ error: "user does not exist" })
            }
            bcrypt.compare(password, savedUser.password)
                .then(doMatch => {
                    if (doMatch) {
                        // res.json({message:"success login in"})
                        const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET)
                        const { _id, name, email, following, follwer } = savedUser;
                        res.json({ token, user: { _id, name, email, following, follwer } })
                    }
                    else {
                        return res.status(422).json({ error: "user don't exist" })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })
})

module.exports = router;