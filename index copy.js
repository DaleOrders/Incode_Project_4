//import and initialise express
const express = require('express')
const app = express()
const session = require('express-session')
const expressLayouts = require('express-ejs-layouts');

//initialise database connection as db
const db = require('./database')
const port = process.env.PORT || 3001

//body passer
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//environment layout
app.set('view engine', 'ejs')
app.set('views', './views')
app.use('/public', express.static('public'))
app.use(expressLayouts);

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

const loginRouter=require('./routes/login')
app.use('/login', loginRouter)


const signupRouter=require('./routes/signup')
app.use('/signup', signupRouter)

const logoutRouter = require('./routes/logout')
app.use('/logout', logoutRouter)

const homeRouter = require('./routes/home')
app.use('/home', homeRouter)




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
