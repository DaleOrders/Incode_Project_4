const express = require('express')
const router = express.Router()
const db = require('../database')
const saltRounds=10;

router.get('/', (req, res) => {
    res.render('pages/signup')
    message: req.query
})

router.post('/', (req, res) => {

    //TODO
    //check validation
    //no empty strings
    //name should only be letters
    //email should be a an email address
    // password should be how many letters? A mix of numbers and letters?



    //checks password and confirm password are the same
    if (req.body.password != req.body.confirmPassword) {
        return res.redirect("/signup?message=Passwords%20don't%20matchs")
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
                    email=req.body.email.toLowerCase(),
                    password=req.bcrypt.hashSync(req.body.password, saltRounds)
                }

                db.none('INSERT INTO users(surname, first_name, email, password) VALUES ($1, $2, $3, $4);', [newUser.surname, newUser.first_name, newUser.email, newUser.password])
                    .then(() => {
                        console.log(newUser)
                        res.redirect('/login')
                    })
                    .catch((err) => {
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