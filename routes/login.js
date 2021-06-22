const express = require('express')
const router = express.Router()
const db = require('../database')
const bcrypt = require('bcrypt');
const{ redirectToHome } = require('../middleware')

router.get('/', redirectToHome, (req, res) => {
    res.render('pages/login', {
        message: req.query.message
    })
})

router.post('/', redirectToHome, (req, res) => {
    // has  the user enteres both email and password?
    if (req.body.email === '' || req.body.password === '') {
        return res.redirect('/login?message=Please%20insert%20both%20email%20and%20password.')
    }
    // does user exist?
    db.oneOrNone('SELECT * FROM users WHERE email = $1', 
    [req.body.email.toLowerCase()])
    .then((existingUser) => {
        // if not. return error
        if (!existingUser) {
            return res.redirect('/login?message=Incorrect%20login%20details.')
        }
        // if yes does password match user password?
        const email = existingUser.email
        const hash = existingUser.password
        const userId = existingUser.id

        bcrypt.compare(req.body.password, hash, function(err, result) {
            if (result) {
                // if successfull, create session and redirect
                req.session.userId = userId
                console.log(userId)
                res.redirect('/')
            } else {
                console.log(err)
                res.redirect('/login?message=Incorrect%20login%20details.')
            }
        })
    })
    .catch((err) => {
        //couldn't query the database properly
        res.send(err.message)
    })
})

module.exports = router