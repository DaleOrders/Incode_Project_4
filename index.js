//import and initialise express
const express = require('express')
const app = express()

//initialise database connection as db
const db = require('./database')

const port = process.env.PORT || 3000

//bcrypt setup
const bcrypt = require('bcrypt')
const saltRounds = 10;

//body passer
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//set view engine
app.set('view engine', 'ejs')
app.use(express.static('public'))

//syntax highlighting
const morgan = require('morgan')
const pgPromise = require('pg-promise')
app.use(morgan('dev'))

//require dotenv to enable env template
//test
require('dotenv').config()


//Step 2: Create the login page

//display login form
app.get('/login', (req, res) => {
    res.render('pages/login')
})

//submit login form
app.post('/login', (req, res) => {
    bcrypt.hash(req.body.password, saltRounds)
        .then(function (hash) {
            users.password = hash;
        });

    const emailValidation = /^[a-zA-Z0-9\-_]+[a-zA-Z0-9\-_\.]*@[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_\.]+$/
    const validEmail = emailValidation.test(req.body.email)

    if (validEmail) {
        bcrypt.compare(req.body.password, hash)
            .then((result) => {
                console.log('authentication successful')
                res.redirect('pages/homepage')
                    .catch((err) => {
                        console.log(err)
                        res.redirect('pages/login')
                    })

            })

    }
})











app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})