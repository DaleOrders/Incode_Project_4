//import and initialise express
const express=require('express')
const app=express()

const port=process.env.PORT||3000

//bcrypt setup
const bcrypt = require('bcrypt')
const saltRounds = 10;

//body passer
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//set view engine
app.set('view engine', 'ejs')
app.use(express.static('public'))







app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})