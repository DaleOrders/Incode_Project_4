const express = require('express')
const router = express.Router()
const db = require('../database')
const bcrypt=require('bcrypt')
const saltRounds=10;

router.get('/', (req, res) => {
    res.render('pages/signup', {
        message: req.query.message
    })
})

router.post('/', (req, res) => {

    //checks that fields are not empty
    if(req.body.password===''||req.body.surname===''||req.body.first_name===''||req.body.email===''){
        return res.redirect("/signup?message=Field%20is%20missing")
    }

    //checks validation on the backend
    // password should be Minimum 6 characters, at least one letter and one number
    const validateEmail=/^[a-zA-Z0-9\-_]+[a-zA-Z0-9\-_\.]*@[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_\.]+$/
    const validateName=/^[A-Za-zÀ-ÖØ-öø-ÿ \-']+$/i
    const validatePassword=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/

    const emailValidation=validateEmail.test(req.body.email.value)
    const validateFirstname=validateName.test(req.body.first_name.value)
    const validateSurname=validateName.test(req.body.surname.value)
    const validatePassword=validatePassword.test(req.body.password.value)

    if(!emailValidation||!validateFirstname||!validateSurname||!validatePassword){
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
            console.log(err)
        })

    })


module.exports = router