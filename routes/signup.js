const express = require('express')
const router = express.Router()
const db = require('../database')
<<<<<<< HEAD
const bcrypt=require('bcrypt')
const saltRounds=10;
=======
>>>>>>> julia

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
        message: req.query.message
    })
})

router.post('/', (req, res) => {
    console.log(req.body)
    //validate the fields
    // Name: alphabet, accented characters, apostophe, dashes, spaces
    // Email: 
    // Password: min 8 characters and max32. alphabets and numeric. alteast one uppercase, one lower case, one numeric, one special character
    //for password: ^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z])(?=.*[^a-zA-Z\d]).{8,32}$

    //checks that fields are not empty
    if(req.body.password===''||req.body.surname===''||req.body.first_name===''||req.body.email===''){
        return res.redirect("/signup?message=Field%20is%20missing")
    }

    //checks validation on the backend
    // password should be Minimum 6 characters, at least one letter and one number
    //TODO do we wish to change this?
    const validateEmail=/^[a-zA-Z0-9\-_]+[a-zA-Z0-9\-_\.]*@[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_\.]+$/
    const validateName=/^[A-Za-zÀ-ÖØ-öø-ÿ \-']+$/i
    const validatePassword=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/

    const emailValidation=validateEmail.test(req.body.email)
    const validateFirstname=validateName.test(req.body.first_name)
    const validateSurname=validateName.test(req.body.surname)
    const validatedPassword=validatePassword.test(req.body.password)

    if(!emailValidation||!validateFirstname||!validateSurname||!validatedPassword){
        return res.redirect("/signup?message=Incorrect%20information%20entered")
    }

    //checks password and confirm password are the same
    if (req.body.password != req.body.confirmPassword) {
        return res.redirect("/signup?message=Passwords%20don't%20match.")
    }

    //checks that user's email is not already in the database
    db.oneOrNone('SELECT * FROM users WHERE email =$1;', [req.body.email])
        .then((existingUser) => {
            console.log(existingUser)
            if (existingUser) {
                res.redirect("/signup?message=User%20already%20exists.")
            } else {
                const newUser = {
                    surname: req.body.surname,
                    first_name: req.body.first_name,
                    email: req.body.email.toLowerCase(),
                    password: req.bcrypt.hashSync(req.body.password, saltRounds)
                }

                db.none('INSERT INTO users(surname, first_name, email, password) VALUES ($1, $2, $3, $4);', [newUser.surname, newUser.first_name, newUser.email, newUser.password])
                    .then(() => {
                        console.log(newUser)
                        res.redirect('/login')
                    })
                    .catch((err) => {
                        console.log(err.message)
                        const message = err.message.replace(/ /g, '%20')
                        res.redirect(`/signup?message=${message}`)
                    })
                }
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

<<<<<<< HEAD
=======
router.get("/success", (req, res) => {
    res.render('/pages/signup-success', {
        message: req.query.message
    })
})
>>>>>>> julia

module.exports = router