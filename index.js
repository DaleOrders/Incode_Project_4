//import and initialise express
const express = require('express')
const app = express()
const session = require('express-session')

//initialise database connection as db
const db = require('./database')
const port = process.env.PORT || 3000

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
//require('dotenv').config()

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
app.use('/', homeRouter)

const employeeRouter = require('./routes/employeePage')
app.use('/employeePage', employeeRouter)

const scheduleRouter = require('./routes/scheduleManagement')
app.use('/scheduleManagement', scheduleRouter)




app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
