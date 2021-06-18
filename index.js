//import and initialise express
const express = require('express')
const app = express()
const session = require('express-session')

//initialise database connection as db
const db = require('./database')
const port = process.env.PORT || 3001

//router files
const loginRouter=require('./routes/login')
const signupRouter=require('./routes/signup')
const logoutRouter = require('./routes/logout')
const homeRouter = require('./routes/home')

//bcrypt setup
const bcrypt = require('bcrypt')
const saltRounds = 10;

//body passer
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//set view engine
app.set('view engine', 'ejs')
app.set('views', './views')
app.use('/public', express.static('public'))

//syntax highlighting
const morgan = require('morgan')
app.use(morgan('dev'))

//require pg-promise
const pgPromise = require('pg-promise')


//require dotenv to enable env template
require('dotenv').config()

// session setup
app.use(session({
    cookie: {
        maxAge: 5000, // 1 hour
        // secure: false, // must be true if served via HTTPS
    },
    name: 'mrcoffee_sid',
    secret: 'Its a secret!',
    resave: false,
    saveUninitialized: false
}))

// routes
app.use('/login', loginRouter)
app.use('/signup', signupRouter)
app.use('/logout', logoutRouter)
app.use('/', homeRouter)


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
