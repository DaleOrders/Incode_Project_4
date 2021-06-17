//import and initialise express
const express = require('express')
const app = express()
const session = require('express-session')

//initialise database connection as db
const db = require('./database')
const port = process.env.PORT || 3000

//router files
const loginRouter=require('./routes/login')
const signupRouter=require('./routes/signup')

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

//session
app.use((session({
    cookie:{
        maxAge: 60 * 60 * 1000, //60
        //secure:false,// must be true if served via https and false if served via HTTP
    },
    secret:process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
})))


app.use('/login', loginRouter)
app.use('/signup', signupRouter)



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})










