const express=require('express')
const router=express.Router()
const db=require('../database')

router.get('/', (req, res) => {
    res.render('pages/signup')
})

router.post('/', (req,res)=>{
    //check validation
            //name should only be letters
            //email should be a an email address
            // password should be how many letters? A mix of numbers and letters?

    //check password and confirm password are the same


    //check that user's email is not already in the database
})



module.exports=router