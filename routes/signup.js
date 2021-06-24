const express = require('express')
const router = express.Router()
const db = require('../database')
const { check, } = require('express-validator')

const bcrypt = require('bcrypt');
const saltRounds = 10;

// middleware for users that are already logged in
const loggedInMessage = (req, res, next) => {
    if (req.session.userId) {
        res.render('pages/signup', {
            message: req.query.message ? req.query.message : "You are already logged in, are you sure you want to sign up?"
        })
    } else {
        next()
    }
}

router.get('/', loggedInMessage, (req, res) => {
    res.render('pages/signup', {
        message: req.query.message,
        documentTitle: "Signup"
    })
})

router.post('/', 
    //validate email and password by using express-validator pkg it doesn't work
    check('email', 'Email is not valid')
        .isEmail()
        .normalizeEmail(),
    check('password')
        .isLength({ min: 5 })
        .withMessage('must be at least 5 chars long')
        .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[^a-zA-Z\d]).{5,32}$/)
        .withMessage('must contain at least one uppercase, one lower case, a number, one special character'),

    (req, res) => {
        const validateEmail=/^[a-zA-Z0-9\-_]+[a-zA-Z0-9\-_\.]*@[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_\.]+$/
        const validatePassword=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[^a-zA-Z\d]).{5,32}$/

        const emailValidation=validateEmail.test(req.body.email)
        const passwValidation=validatePassword.test(req.body.password)

    if (!emailValidation) {
        return res.redirect("/signup?message=Email%20don't%20match.")
    }
    if (!passwValidation) {
        //123qweQWE!@#
        return res.redirect("/signup?message=Password%20must%20contain%20at%20least%20one%20uppercase,%20one%20lowercase,%20a%20number,%20one%20special%20character%20and%205%20characters%20long.")
    }
    //check whether password and confirmPassword are the same
    if (req.body.password != req.body.confirmPassword) {
        return res.redirect("/signup?message=Passwords%20don't%20match.")
    }
    if (req.body.email === '' || req.body.password === '' || req.body.first_name === '' || req.body.surname === '') {
        return res.redirect('/signup?message=Please%20fill%20in%20all%20fields.')
    }
    // check whether email already exists in the database
    db.oneOrNone('SELECT * FROM users WHERE email = $1;', [req.body.email.toLowerCase()])
    .then((existingUser) => {
        if (existingUser) {
            // email already exists
            res.redirect("/signup?message=User%20already%20exists.")
        } else {
            // put data into database
            const newUser = {
                firstname: req.body.first_name,
                lastname: req.body.surname,
                email: req.body.email.toLowerCase(),
                password: bcrypt.hashSync(req.body.password, saltRounds)
            }
            
            db.none('INSERT INTO users(email, first_name, surname, password) VALUES ($1, $2, $3, $4);',
            [newUser.email, newUser.firstname, newUser.lastname, newUser.password])
            .then(() => {
                res.redirect('/login')
            })
            .catch((err) => {
                // error if user hasn't been inserted into the db
                const message = err.message.replace(/ /g, '%20')
                res.redirect(`/signup?message=${message}`)
            })
        }
    })
    .catch((err) => {
        // failed to check whether user email exists or not
        res.send(err.message)
    })
})

router.get("/success", (req, res) => {
    res.render('/pages/signup-success', {
        message: req.query.message
    })
})

module.exports = router